import React, { useState, useEffect, useCallback } from "react";
import { X, Clock, DollarSign, ArrowLeft, CreditCard } from "lucide-react";
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
  stripePaymentLink?: string; // Альтернатива: прямой URL на Payment Link
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentReady, setPaymentReady] = useState(false);

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  // Формируем URL для редиректа с учетом base path
  const getBaseUrl = () => {
    if (typeof window === "undefined") return "";
    const base = import.meta.env.BASE_URL || "/moisait/assets/clinic-app/";
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

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowCalendar(true);
    setPaymentError(null);
    setPaymentReady(false);
  };

  const handleBack = () => {
    if (showCalendar) {
      setShowCalendar(false);
      setSelectedService(null);
    }
  };

  const handleClose = () => {
    setShowCalendar(false);
    setSelectedService(null);
    setPaymentError(null);
    setIsProcessingPayment(false);
    setPaymentReady(false);
    onClose();
  };

  const startStripeCheckout = useCallback(async () => {
    if (!selectedService) {
      return;
    }

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
      // Вариант 1: Если есть Payment Link, используем прямой редирект
      if (selectedService.stripePaymentLink) {
        console.log("Using Payment Link for direct redirect");
        window.location.href = selectedService.stripePaymentLink;
        return; // Редирект произойдет, не сбрасываем isProcessingPayment
      }

      const stripePromiseInstance = getStripe(publishableKey);
      if (!stripePromiseInstance) {
        throw new Error("Не удалось инициализировать Stripe.");
      }

      const stripe = await stripePromiseInstance;
      if (!stripe) {
        throw new Error("Stripe недоступен. Проверьте ключ.");
      }

      console.log("Attempting Stripe checkout with:", {
        priceId: selectedService.stripePriceId,
        successUrl,
        cancelUrl,
      });

      // В новых версиях Stripe.js redirectToCheckout требует sessionId
      // Для работы с lineItems напрямую нужно использовать другой подход
      // Попробуем использовать прямой редирект через создание Checkout Session

      // Вариант 1: Если есть бэкенд endpoint для создания сессии (рекомендуемый способ)
      const backendUrl = import.meta.env.VITE_STRIPE_BACKEND_URL;
      if (backendUrl) {
        console.log("Creating Checkout Session via backend");
        const response = await fetch(`${backendUrl}/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId: selectedService.stripePriceId,
            successUrl: successUrl || `${window.location.origin}${window.location.pathname}?payment=success`,
            cancelUrl: cancelUrl || `${window.location.origin}${window.location.pathname}?payment=cancelled`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Не удалось создать сессию оплаты. Проверьте настройки бэкенда."
          );
        }

        const { sessionId, url } = await response.json();

        // Если есть прямой URL, используем его (более надежно)
        if (url) {
          console.log("Redirecting to Stripe Checkout:", url);
          window.location.href = url;
          return;
        }

        // Иначе используем redirectToCheckout
        const checkoutReadyStripe = stripe as StripeCheckoutCapable;
        if (checkoutReadyStripe?.redirectToCheckout) {
          const result = await checkoutReadyStripe.redirectToCheckout({
            sessionId: sessionId,
          });

          if (result.error) {
            throw new Error(result.error.message || "Ошибка редиректа");
          }
          return;
        }
      }

      // Вариант 2: Прямой вызов redirectToCheckout с lineItems (может не работать в новых версиях)
      const checkoutReadyStripe = stripe as StripeCheckoutCapable;
      if (
        checkoutReadyStripe &&
        typeof checkoutReadyStripe.redirectToCheckout === "function"
      ) {
        console.log("Trying redirectToCheckout with lineItems");

        try {
          const result = (await Promise.race([
            checkoutReadyStripe.redirectToCheckout({
              mode: "payment",
              lineItems: [
                { price: selectedService.stripePriceId, quantity: 1 },
              ],
              successUrl: successUrl || window.location.origin,
              cancelUrl: cancelUrl || window.location.origin,
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Таймаут")), 5000)
            ),
          ])) as any;

          if (result?.error) {
            throw new Error(result.error.message || "Ошибка редиректа");
          }
          console.log("Redirect initiated");
          return;
        } catch (err: any) {
          if (err.message === "Таймаут") {
            throw new Error(
              "Редирект завис. Используйте Stripe Payment Links или настройте бэкенд endpoint."
            );
          }
          throw err;
        }
      }

      // Если ничего не сработало
      throw new Error(
        "Для работы оплаты требуется один из вариантов:\n" +
          "1. Бэкенд endpoint (VITE_STRIPE_BACKEND_URL)\n" +
          "2. Stripe Payment Link (добавьте stripePaymentLink в конфигурацию услуги)\n" +
          "3. Или создайте Payment Link в Stripe Dashboard и используйте его URL"
      );
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      setPaymentError(
        error?.message || "Произошла ошибка при переходе к оплате."
      );
      setIsProcessingPayment(false);
    }
  }, [selectedService, publishableKey, successUrl, cancelUrl]);

  // Слушаем сообщения от Cal.com
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Логируем все сообщения для отладки
      console.log("Received message:", {
        origin: event.origin,
        data: event.data,
        type: typeof event.data,
      });

      // Проверяем различные варианты origin от Cal.com
      const isCalComOrigin =
        event.origin === "https://cal.com" ||
        event.origin === "https://app.cal.com" ||
        event.origin.includes("cal.com");

      if (isCalComOrigin) {
        const data = event.data;

        // Различные форматы сообщений от Cal.com
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
          console.log("✅ Booking successful! Enabling payment button.");
          setPaymentReady(true);
          setPaymentError(null);

          // Автоматическое перенаправление на Stripe (опционально, можно отключить через env)
          const autoRedirect = import.meta.env.VITE_STRIPE_AUTO_REDIRECT === "true";
          if (autoRedirect && selectedService) {
            // Небольшая задержка для лучшего UX
            setTimeout(() => {
              startStripeCheckout();
            }, 1500);
          }
        }
      }
    };

    // Также слушаем сообщения от всех источников (для отладки)
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
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl m-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {showCalendar && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-2xl font-bold">
                {showCalendar ? selectedService?.name : "Записаться на прием"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {showCalendar && selectedService && (
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{selectedService.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>{selectedService.price} CZK</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {/* Шаг 1: Выбор услуги */}
          {!showCalendar && (
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Выберите услугу
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-blue-600"
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
                  ℹ️ Информация о записи
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>✓ Онлайн запись 24/7</li>
                  <li>✓ Подтверждение на email</li>
                  <li>✓ Напоминание за 24 часа</li>
                  <li>✓ Легкая отмена/перенос</li>
                </ul>
              </div>
            </div>
          )}

          {/* Шаг 2: Cal.com календарь + Stripe */}
          {showCalendar && selectedService && (
            <div className="p-4 space-y-4">
              {/* Cal.com iframe - занимает всё пространство */}
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src={`https://cal.com/${selectedService.calLink}?embed=true`}
                  width="100%"
                  height="650px"
                  frameBorder="0"
                  style={{
                    border: "none",
                    borderRadius: "8px",
                  }}
                  title="Cal.com Booking"
                />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedService.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {selectedService.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedService.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-blue-300">
                  <span className="text-gray-600">Длительность:</span>
                  <span className="font-semibold">
                    {selectedService.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-300">
                  <span className="text-gray-800 font-semibold">К оплате:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedService.price} CZK
                  </span>
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
                        : "Завершите бронирование в календаре выше, затем нажмите кнопку для оплаты."}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={startStripeCheckout}
                  disabled={!paymentReady || isProcessingPayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 py-3 text-lg font-semibold"
                >
                  {!paymentReady
                    ? "Завершите выбор времени в календаре"
                    : isProcessingPayment
                    ? "Перенаправляем..."
                    : "Оплатить через Stripe"}
                </Button>
                {!paymentReady && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      После подтверждения брони Cal.com разблокирует кнопку
                      оплаты.
                    </p>
                    <Button
                      onClick={() => {
                        console.log("Manual payment unlock clicked");
                        setPaymentReady(true);
                      }}
                      variant="outline"
                      className="w-full text-sm border-blue-300 text-blue-600 hover:bg-blue-100"
                    >
                      Я уже забронировал слот → Разблокировать оплату
                    </Button>
                  </div>
                )}
                {paymentError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {paymentError}
                  </div>
                )}
              </Card>

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
