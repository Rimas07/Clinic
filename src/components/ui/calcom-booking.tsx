import React, { useEffect, useState } from "react";
import { X, Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  calLink: string;
  icon: string;
}

interface CalComBookingImprovedProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalComBookingImproved: React.FC<CalComBookingImprovedProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const services: Service[] = [
    {
      id: "1",
      name: "Общая консультация",
      description: "Первичный прием врача общей практики",
      duration: "30 мин",
      price: "3000 ₽",
      calLink: "https://cal.com/zorych-clinic-y4wc5f/30min",
      icon: "👨‍⚕️",
    },
    {
      id: "2",
      name: "Кардиология",
      description: "Консультация кардиолога с ЭКГ",
      duration: "45 мин",
      price: "4500 ₽",
      calLink: "zoryx-clinic/cardiology",
      icon: "❤️",
    },
    {
      id: "3",
      name: "Анализы крови",
      description: "Общий и биохимический анализ",
      duration: "15 мин",
      price: "2500 ₽",
      calLink: "zoryx-clinic/blood-tests",
      icon: "🩸",
    },
    {
      id: "4",
      name: "Стоматология",
      description: "Консультация стоматолога",
      duration: "40 мин",
      price: "3500 ₽",
      calLink: "zoryx-clinic/dentistry",
      icon: "🦷",
    },
    {
      id: "5",
      name: "УЗИ диагностика",
      description: "Ультразвуковое исследование",
      duration: "30 мин",
      price: "4000 ₽",
      calLink: "zoryx-clinic/ultrasound",
      icon: "📊",
    },
    {
      id: "6",
      name: "Лабораторные анализы",
      description: "Полный комплекс лабораторных исследований",
      duration: "20 мин",
      price: "3200 ₽",
      calLink: "zoryx-clinic/lab-tests",
      icon: "🔬",
    },
  ];

  useEffect(() => {
    if (isOpen && showCalendar) {
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen, showCalendar]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowCalendar(true);
  };

  const handleBack = () => {
    setShowCalendar(false);
    setSelectedService(null);
  };

  const handleClose = () => {
    setShowCalendar(false);
    setSelectedService(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl m-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showCalendar && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <h2 className="text-2xl font-bold">
                {showCalendar ? selectedService?.name : "Выберите услугу"}
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
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{selectedService.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>{selectedService.price}</span>
              </div>
            </div>
          )}
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {!showCalendar ? (
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">
                Выберите услугу для записи на прием
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:border-blue-500"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3 text-center">
                        {service.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 text-center min-h-[40px]">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{service.duration}</span>
                        </div>
                        <span className="font-semibold text-blue-600">
                          {service.price}
                        </span>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                        Записаться
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Информация о записи
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Запись доступна 24/7 онлайн</li>
                  <li>Вы получите подтверждение на email</li>
                  <li>Можно выбрать удобное время</li>
                  <li>Напоминание за 24 часа до визита</li>
                  <li>Возможность переноса или отмены записи</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {selectedService && (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{selectedService.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {selectedService.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {selectedService.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Clock size={14} />
                            {selectedService.duration}
                          </span>
                          <span className="font-semibold text-blue-600">
                            {selectedService.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-lg overflow-hidden border border-gray-200"
                    style={{ minHeight: "700px" }}
                  >
                    <div
                      data-cal-link={selectedService.calLink}
                      data-cal-config='{"layout":"month_view","theme":"light"}'
                      style={{ width: "100%", height: "700px" }}
                    />
                  </div>

                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                      После выбора даты и времени вы сможете заполнить форму и
                      подтвердить бронирование
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Альтернативный компонент: Кнопка с Popup
 */
export const CalComPopupButton: React.FC<{
  calLink: string;
  children: React.ReactNode;
  className?: string;
}> = ({ calLink, children, className = "" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view","theme":"light"}'
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
};
