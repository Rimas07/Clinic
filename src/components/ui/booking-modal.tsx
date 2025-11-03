import React, { useState } from "react";
import { X, Calendar, Clock, CreditCard, Check } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  icon?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);

  // Примеры услуг - потом можно загружать из Firebase
  const services: Service[] = [
    {
      id: "1",
      name: "Общая консультация",
      description: "Первичный прием врача общей практики",
      duration: "30 мин",
      price: "3000 ₽",
    },
    {
      id: "2",
      name: "Кардиология",
      description: "Консультация кардиолога с ЭКГ",
      duration: "45 мин",
      price: "4500 ₽",
    },
    {
      id: "3",
      name: "Анализы крови",
      description: "Общий и биохимический анализ",
      duration: "15 мин",
      price: "2500 ₽",
    },
    {
      id: "4",
      name: "Стоматология",
      description: "Консультация стоматолога",
      duration: "40 мин",
      price: "3500 ₽",
    },
  ];

  // Примеры доступных временных слотов
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00", available: true },
    { id: "2", time: "10:00", available: true },
    { id: "3", time: "11:00", available: false },
    { id: "4", time: "12:00", available: true },
    { id: "5", time: "14:00", available: true },
    { id: "6", time: "15:00", available: true },
    { id: "7", time: "16:00", available: false },
    { id: "8", time: "17:00", available: true },
  ];

  const steps = [
    { number: 1, title: "Услуга", icon: Check },
    { number: 2, title: "Дата и время", icon: Calendar },
    { number: 3, title: "Оплата", icon: CreditCard },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    // Здесь будет логика для сохранения бронирования в Firebase
    console.log("Booking:", {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
    });
    alert("Бронирование успешно создано! (Демо)");
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl m-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Записаться на прием</h2>
            <button
              onClick={onClose}
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
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                      selectedService?.id === service.id
                        ? "ring-2 ring-blue-600 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg text-gray-800">
                        {service.name}
                      </h4>
                      <span className="text-blue-600 font-bold">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={16} className="mr-1" />
                      {service.duration}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Выбор даты и времени */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">
                  Выбранная услуга:
                </h4>
                <p className="text-gray-600">{selectedService?.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedService?.duration} • {selectedService?.price}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Выберите дату
                </h3>
                <p className="text-gray-600 mb-4">
                  📅 Здесь будет календарь (интегрируем библиотеку)
                </p>
                {/* Временная заглушка */}
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <p className="text-gray-500">
                    Календарь будет добавлен на следующем этапе
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Используйте react-calendar или react-day-picker
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Доступное время
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg font-medium transition-all ${
                        slot.available
                          ? selectedTime?.id === slot.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-blue-100 text-gray-800"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
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
                  onClick={handleNextStep}
                  disabled={!selectedTime}
                  className="flex-1"
                >
                  Далее
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Оплата */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Детали бронирования
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Услуга:</span>
                    <span className="font-semibold">
                      {selectedService?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дата:</span>
                    <span className="font-semibold">
                      {selectedDate?.toLocaleDateString() || "Не выбрана"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Время:</span>
                    <span className="font-semibold">{selectedTime?.time}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-300">
                    <span className="text-gray-800 font-semibold">
                      Итого:
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {selectedService?.price}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Способ оплаты
                </h3>
                <div className="space-y-3">
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-all border-2 border-blue-600 bg-blue-50">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked
                        className="mr-3"
                      />
                      <div>
                        <p className="font-semibold">Банковская карта</p>
                        <p className="text-sm text-gray-600">
                          Visa, MasterCard, Мир
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <input type="radio" name="payment" className="mr-3" />
                      <div>
                        <p className="font-semibold">Оплата на месте</p>
                        <p className="text-sm text-gray-600">
                          Наличные или карта
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
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
                  onClick={handleBooking}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Подтвердить бронирование
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
