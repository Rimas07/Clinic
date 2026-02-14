import React, { useState, useEffect, useCallback } from "react";
import { X, Clock, ArrowLeft, CreditCard, Calendar, Check } from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe as StripeClient } from "@stripe/stripe-js";

let stripePromise: Promise<StripeClient | null> | null = null;
const getStripe = (publishableKey?: string) => {
  if (!publishableKey) {
    return null;
  }
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

type CheckoutRedirectOptions = {
  mode?: "payment";
  lineItems?: { price: string; quantity: number }[];
  sessionId?: string;
  successUrl?: string;
  cancelUrl?: string;
};

type StripeCheckoutCapable = StripeClient & {
  redirectToCheckout: (
    options: CheckoutRedirectOptions
  ) => Promise<{ error?: { message?: string } }>;
};

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  icon?: string;
  calLink: string;
  stripePriceId?: string;
  stripePaymentLink?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentReady, setPaymentReady] = useState(false);

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const getBaseUrl = () => {
    if (typeof window === "undefined") return "";
    const base = import.meta.env.BASE_URL || "/";
    return `${window.location.origin}${base}`;
  };

  const successUrl =
    import.meta.env.VITE_STRIPE_SUCCESS_URL ||
    (typeof window !== "undefined"
      ? `${getBaseUrl()}?payment=success`
      : undefined);
  const cancelUrl =
    import.meta.env.VITE_STRIPE_CANCEL_URL ||
    (typeof window !== "undefined"
      ? `${getBaseUrl()}?payment=cancelled`
      : undefined);

  const services: Service[] = [
    {
      id: "1",
      name: "Общая консультация",
      description: "Первичный прием врача общей практики",
      duration: "30 мин",
      price: "300",
      calLink: "zorych-clinic-y4wc5f/30min",
      icon: "👨‍⚕️",
      stripePriceId: import.meta.env.VITE_STRIPE_PRICE_GENERAL,
    },
    {
      id: "2",
      name: "Кардиология",
      description: "Консультация кардиолога с ЭКГ",
      duration: "45 мин",
      price: "300",
      calLink: "zorych-clinic-y4wc5f/30min",
      icon: "❤️",
      stripePriceId:
        import.meta.env.VITE_STRIPE_PRICE_CARDIO ||
        import.meta.env.VITE_STRIPE_PRICE_GENERAL,
    },
    {
      id: "3",
      name: "Анализы крови",
      description: "Общий и биохимический анализ",
      duration: "15 мин",
      price: "300",
      calLink: "zorych-clinic-y4wc5f/30min",
      icon: "🩸",
      stripePriceId:
        import.meta.env.VITE_STRIPE_PRICE_LABS ||
        import.meta.env.VITE_STRIPE_PRICE_GENERAL,
    },
    {
      id: "4",
      name: "Стоматология",
      description: "Консультация стоматолога",
      duration: "40 мин",
      price: "300",
      calLink: "zorych-clinic-y4wc5f/30min",
      icon: "🦷",
      stripePriceId:
        import.meta.env.VITE_STRIPE_PRICE_DENTAL ||
        import.meta.env.VITE_STRIPE_PRICE_GENERAL,
    },
  ];

  const steps = [
    { number: 1, title: "Услуга", icon: Check },
    { number: 2, title: "Дата и время", icon: Calendar },
    { number: 3, title: "Оплата", icon: CreditCard },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setPaymentError(null);
    setPaymentReady(false);
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedService(null);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setPaymentError(null);
    setIsProcessingPayment(false);
    setPaymentReady(false);
    onClose();
  };

  const startStripeCheckout = useCallback(async () => {
    if (!selectedService) return;

    if (!publishableKey) {
      setPaymentError(
        "Страйп не настроен: добавьте VITE_STRIPE_PUBLISHABLE_KEY в .env."
      );
      return;
    }

    if (!selectedService.stripePriceId) {
      setPaymentError(
        "Для выбранной услуги не указан Stripe price ID (VITE_STRIPE_PRICE_*)."
      );
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      if (selectedService.stripePaymentLink) {
        window.location.href = selectedService.stripePaymentLink;
        return;
      }

      const stripePromiseInstance = getStripe(publishableKey);
      if (!stripePromiseInstance) {
        throw new Error("Не удалось инициализировать Stripe.");
      }

      const stripe = await stripePromiseInstance;
      if (!stripe) {
        throw new Error("Stripe недоступен. Проверьте ключ.");
      }

      const backendUrl = import.meta.env.VITE_STRIPE_BACKEND_URL || "";
      {
        const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId: selectedService.stripePriceId,
            successUrl:
              successUrl ||
              `${window.location.origin}${window.location.pathname}?payment=success`,
            cancelUrl:
              cancelUrl ||
              `${window.location.origin}${window.location.pathname}?payment=cancelled`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              "Не удалось создать сессию оплаты. Проверьте настройки бэкенда."
          );
        }

        const { sessionId, url } = await response.json();

        if (url) {
          window.location.href = url;
          return;
        }

        const checkoutReadyStripe = stripe as StripeCheckoutCapable;
        if (checkoutReadyStripe?.redirectToCheckout) {
          const result = await checkoutReadyStripe.redirectToCheckout({
            sessionId,
          });
          if (result.error) {
            throw new Error(result.error.message || "Ошибка редиректа");
          }
          return;
        }
      }

      throw new Error("Не удалось перенаправить на страницу оплаты.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при переходе к оплате.";
      console.error("Stripe checkout error:", error);
      setPaymentError(errorMessage);
      setIsProcessingPayment(false);
    }
  }, [selectedService, publishableKey, successUrl, cancelUrl]);

  // Слушаем сообщения от Cal.com для разблокировки оплаты
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const isCalComOrigin =
        event.origin === "https://cal.com" ||
        event.origin === "https://app.cal.com" ||
        event.origin.includes("cal.com");

      if (isCalComOrigin) {
        const data = event.data;

        const isBookingSuccess =
          data?.type === "CAL:bookingSuccessful" ||
          data === "CAL:bookingSuccessful" ||
          data?.type === "bookingSuccessful" ||
          data === "bookingSuccessful" ||
          (typeof data === "string" &&
            (data.includes("booking") ||
              data.includes("success") ||
              data.includes("confirmed"))) ||
          data?.event === "bookingSuccessful" ||
          data?.status === "confirmed";

        if (isBookingSuccess) {
          setPaymentReady(true);
          setPaymentError(null);

          const autoRedirect =
            import.meta.env.VITE_STRIPE_AUTO_REDIRECT === "true";
          if (autoRedirect && selectedService) {
            setTimeout(() => {
              setCurrentStep(3);
              startStripeCheckout();
            }, 1500);
          } else {
            setCurrentStep(3);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage, false);
    return () => window.removeEventListener("message", handleMessage, false);
  }, [selectedService, startStripeCheckout]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl m-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-2xl font-bold">
                {currentStep === 1
                  ? "Записаться на прием"
                  : currentStep === 2
                  ? selectedService?.name || "Выбор времени"
                  : "Оплата"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step.number
                        ? "bg-white text-blue-600 scale-110"
                        : "bg-white/30 text-white"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check size={20} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-xs mt-2 font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStep > step.number ? "bg-white" : "bg-white/30"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Выбор услуги */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Выберите услугу
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 ${
                      selectedService?.id === service.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-transparent hover:border-blue-600"
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{service.icon}</span>
                        <h4 className="font-semibold text-lg text-gray-800">
                          {service.name}
                        </h4>
                      </div>
                      <span className="text-blue-600 font-bold">
                        {service.price} CZK
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 ml-12">
                      {service.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm ml-12">
                      <Clock size={16} className="mr-1" />
                      {service.duration}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Информация о записи
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>Онлайн запись 24/7</li>
                  <li>Подтверждение на email</li>
                  <li>Напоминание за 24 часа</li>
                  <li>Легкая отмена/перенос</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Cal.com календарь */}
          {currentStep === 2 && selectedService && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">
                  Выбранная услуга:
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl">{selectedService.icon}</span>
                  <p className="text-gray-600">{selectedService.name}</p>
                  <span className="text-sm text-gray-500">
                    {selectedService.duration} &bull; {selectedService.price} CZK
                  </span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src={`https://cal.com/${selectedService.calLink}?embed=true`}
                  width="100%"
                  height="650px"
                  frameBorder="0"
                  style={{ border: "none", borderRadius: "8px" }}
                  title="Cal.com Booking"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex-1"
                >
                  Назад
                </Button>
                <Button
                  onClick={() => {
                    setPaymentReady(true);
                    setCurrentStep(3);
                  }}
                  className="flex-1"
                >
                  Я забронировал слот — перейти к оплате
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Оплата через Stripe */}
          {currentStep === 3 && selectedService && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Детали бронирования
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Услуга:</span>
                    <span className="font-semibold flex items-center gap-2">
                      <span>{selectedService.icon}</span>
                      {selectedService.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Длительность:</span>
                    <span className="font-semibold">
                      {selectedService.duration}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-300">
                    <span className="text-gray-800 font-semibold">
                      К оплате:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {selectedService.price} CZK
                    </span>
                  </div>
                </div>
              </div>

              <Card className="p-4 border-2 border-blue-600 bg-blue-50 space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold">Оплата через Stripe</p>
                    <p className="text-sm text-gray-600">
                      {paymentReady
                        ? "Бронирование подтверждено! Нажмите кнопку для оплаты."
                        : "Завершите бронирование в календаре, затем нажмите кнопку для оплаты."}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={startStripeCheckout}
                  disabled={isProcessingPayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 py-3 text-lg font-semibold"
                >
                  {isProcessingPayment
                    ? "Перенаправляем..."
                    : "Оплатить через Stripe"}
                </Button>
                {paymentError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {paymentError}
                  </div>
                )}
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="flex-1"
                >
                  Назад
                </Button>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-sm text-gray-700">
                После оплаты вы получите подтверждение на email. Если хотите
                оплатить в клинике, просто закройте окно после бронирования.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
