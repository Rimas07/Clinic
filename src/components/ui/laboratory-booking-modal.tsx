import React, { useState } from "react";
import { X, Microscope, Clock, CreditCard, Check, Calendar } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export interface LabTest {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  preparation?: string;
  category: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface LaboratoryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaboratoryBookingModal: React.FC<LaboratoryBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);

  // Лабораторные анализы
  const labTests: LabTest[] = [
    {
      id: "blood-general",
      name: "Общий анализ крови",
      description: "Полный анализ крови с подсчетом всех клеток",
      duration: "10 мин",
      price: "800 Kč",
      preparation: "Натощак (8-12 часов без еды)",
      category: "Анализы крови",
    },
    {
      id: "blood-biochemistry",
      name: "Биохимический анализ крови",
      description: "Глюкоза, холестерин, печеночные ферменты, почки",
      duration: "10 мин",
      price: "1500 Kč",
      preparation: "Натощак (8-12 часов без еды)",
      category: "Анализы крови",
    },
    {
      id: "urine-general",
      name: "Общий анализ мочи",
      description: "Физико-химический анализ и микроскопия",
      duration: "5 мин",
      price: "400 Kč",
      preparation: "Утренняя порция мочи",
      category: "Анализы мочи",
    },
    {
      id: "thyroid",
      name: "Гормоны щитовидной железы",
      description: "TSH, T3, T4 свободный",
      duration: "10 мин",
      price: "1800 Kč",
      preparation: "Можно не натощак",
      category: "Гормональные анализы",
    },
    {
      id: "vitamin-d",
      name: "Витамин D",
      description: "Уровень 25-OH витамина D в крови",
      duration: "10 мин",
      price: "900 Kč",
      preparation: "Можно не натощак",
      category: "Витамины",
    },
    {
      id: "iron",
      name: "Железо и ферритин",
      description: "Показатели обмена железа",
      duration: "10 мин",
      price: "1200 Kč",
      preparation: "Натощак",
      category: "Анализы крови",
    },
    {
      id: "covid-pcr",
      name: "ПЦР тест на COVID-19",
      description: "Мазок из носоглотки, результат за 24 часа",
      duration: "5 мин",
      price: "1500 Kč",
      preparation: "Не есть/пить за 30 мин",
      category: "Инфекции",
    },
    {
      id: "allergy-panel",
      name: "Панель аллергенов",
      description: "20 самых распространенных аллергенов",
      duration: "10 мин",
      price: "2500 Kč",
      preparation: "Можно не натощак",
      category: "Аллергология",
    },
  ];

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "07:00", available: true },
    { id: "2", time: "08:00", available: true },
    { id: "3", time: "09:00", available: false },
    { id: "4", time: "10:00", available: true },
    { id: "5", time: "11:00", available: true },
    { id: "6", time: "12:00", available: false },
  ];

  const steps = [
    { number: 1, title: "Анализ", icon: Microscope },
    { number: 2, title: "Дата и время", icon: Calendar },
    { number: 3, title: "Подтверждение", icon: Check },
  ];

  const handleTestSelect = (test: LabTest) => {
    setSelectedTest(test);
    setCurrentStep(2);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot);
    }
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
    console.log("Lab Test Booking:", {
      test: selectedTest,
      date: selectedDate,
      time: selectedTime,
    });
    alert(`Запись на ${selectedTest?.name} успешно создана! (Демо)`);
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedTest(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  if (!isOpen) return null;

  // Группировка анализов по категориям
  const groupedTests = labTests.reduce((acc, test) => {
    if (!acc[test.category]) {
      acc[test.category] = [];
    }
    acc[test.category].push(test);
    return acc;
  }, {} as Record<string, LabTest[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl m-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Запись на анализы</h2>
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
                        ? "bg-white text-green-600 scale-110"
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
          {/* Step 1: Выбор анализа */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Выберите анализ
              </h3>
              
              {Object.entries(groupedTests).map(([category, tests]) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Microscope size={20} className="text-green-600" />
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {tests.map((test) => (
                      <Card
                        key={test.id}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                          selectedTest?.id === test.id
                            ? "ring-2 ring-green-600 bg-green-50"
                            : ""
                        }`}
                        onClick={() => handleTestSelect(test)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-base text-gray-800">
                            {test.name}
                          </h5>
                          <span className="text-green-600 font-bold">
                            {test.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {test.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {test.duration}
                          </span>
                        </div>
                        {test.preparation && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-orange-600">
                              ⚠️ {test.preparation}
                            </p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Выбор даты и времени */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">Выбранный анализ:</h4>
                <p className="text-gray-600">{selectedTest?.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedTest?.duration} • {selectedTest?.price}
                </p>
                {selectedTest?.preparation && (
                  <p className="text-sm text-orange-600 mt-2">
                    ⚠️ Подготовка: {selectedTest.preparation}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Выберите дату
                </h3>
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <p className="text-gray-500">
                    📅 Календарь будет добавлен
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Используйте react-day-picker
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Доступное время (утренние часы)
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg font-medium transition-all ${
                        slot.available
                          ? selectedTime?.id === slot.id
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 hover:bg-green-100 text-gray-800"
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
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Далее
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Подтверждение */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Подтверждение записи
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Анализ:</span>
                    <span className="font-semibold">{selectedTest?.name}</span>
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
                  <div className="flex justify-between pt-2 border-t border-green-300">
                    <span className="text-gray-800 font-semibold">Стоимость:</span>
                    <span className="text-xl font-bold text-green-600">
                      {selectedTest?.price}
                    </span>
                  </div>
                </div>
              </div>

              {selectedTest?.preparation && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    ⚠️ Важно - подготовка к анализу:
                  </h4>
                  <p className="text-orange-700">{selectedTest.preparation}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  ℹ️ После подтверждения вы получите SMS с напоминанием за день до визита.
                </p>
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
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  Подтвердить запись
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};