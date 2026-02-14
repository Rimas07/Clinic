import React, { useState } from "react";
import { X, Shield, Clock, CreditCard, Check } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
export interface InsuranceProduct {
  id: string;
  name: string;
  provider: string;
  description: string;
  duration: string;
  price: string;
  coverage: string[];
  logo?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

interface InsuranceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InsuranceBookingModal: React.FC<InsuranceBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceProduct | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("card");

  // Чешские страховки
  const insuranceProducts: InsuranceProduct[] = [
    {
      id: "vzp",
      name: "VZP - Všeobecná zdravotní pojišťovna",
      provider: "VZP",
      description: "Крупнейшая чешская страховая компания, покрывает 60% населения",
      duration: "12 месяцев",
      price: "95 €/мес",
      coverage: [
        "Полное медицинское обслуживание",
        "Госпитализация",
        "Специалисты",
        "Лекарства по рецепту",
        "Стоматология (базовая)",
        "Профилактические осмотры",
      ],
    },
    {
      id: "pvzp",
      name: "PVZP - Pražská zdravotní pojišťovna",
      provider: "PVZP",
      description: "Пражская страховая компания с широкой сетью клиник",
      duration: "12 месяцев",
      price: "92 €/мес",
      coverage: [
        "Амбулаторное лечение",
        "Стационарное лечение",
        "Лабораторные анализы",
        "Диагностика",
        "Реабилитация",
        "Скорая помощь",
      ],
    },
    {
      id: "vzp-student",
      name: "VZP Student",
      provider: "VZP",
      description: "Специальный тариф для студентов до 26 лет",
      duration: "12 месяцев",
      price: "65 €/мес",
      coverage: [
        "Базовое медицинское обслуживание",
        "Неотложная помощь",
        "Базовая стоматология",
        "Рецептурные лекарства",
        "Вакцинация",
      ],
    },
    {
      id: "axa",
      name: "AXA Smart Coverage",
      provider: "AXA",
      description: "Международная страховка для экспатов",
      duration: "12 месяцев",
      price: "89 €/мес",
      coverage: [
        "Неотложная медицинская помощь",
        "Госпитализация и операции",
        "Рецептурные лекарства",
        "Стоматология (базовая)",
        "Психологическая поддержка",
        "Профилактические осмотры",
      ],
    },
    {
      id: "uniqa",
      name: "UNIQA Health Plus",
      provider: "UNIQA",
      description: "Премиальная страховка с расширенным покрытием",
      duration: "6-24 месяца (гибко)",
      price: "125 €/мес",
      coverage: [
        "Полные медицинские консультации",
        "Лечение у специалистов",
        "Диагностические процедуры",
        "Неотложная помощь",
        "Материнство",
        "Хронические заболевания",
      ],
    },
    {
      id: "slavia",
      name: "SLAVIA Essential",
      provider: "SLAVIA",
      description: "Доступная страховка для молодых специалистов",
      duration: "6-12 месяцев",
      price: "65 €/мес",
      coverage: [
        "Базовые консультации",
        "Неотложное лечение",
        "Основные лекарства",
        "Базовая стоматология",
        "Экстренная стоматология",
        "Медосмотры",
      ],
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Банковская карта",
      description: "Visa, MasterCard, Мир",
    },
    {
      id: "bank-transfer",
      name: "Банковский перевод",
      description: "Перевод на счет страховой компании",
    },
    {
      id: "monthly",
      name: "Ежемесячная оплата",
      description: "Автоматическое списание каждый месяц",
    },
  ];

  const steps = [
    { number: 1, title: "Страховка", icon: Shield },
    { number: 2, title: "Оплата", icon: CreditCard },
  ];

  const handleInsuranceSelect = (insurance: InsuranceProduct) => {
    setSelectedInsurance(insurance);
  };

  const handleNextStep = () => {
    if (currentStep < 2 && selectedInsurance) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePurchase = () => {
    console.log("Insurance Purchase:", {
      insurance: selectedInsurance,
      payment: selectedPayment,
    });
    alert(`Покупка страховки ${selectedInsurance?.provider} успешна! (Демо)`);
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedInsurance(null);
    setSelectedPayment("card");
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
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl m-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Покупка медицинской страховки</h2>
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
          {/* Step 1: Выбор страховки */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Выберите страховую компанию
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insuranceProducts.map((insurance) => (
                  <Card
                    key={insurance.id}
                    className={`p-5 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                      selectedInsurance?.id === insurance.id
                        ? "ring-2 ring-blue-600 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => handleInsuranceSelect(insurance)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="text-blue-600" size={20} />
                          <span className="text-sm font-bold text-blue-600">
                            {insurance.provider}
                          </span>
                        </div>
                        <h4 className="font-semibold text-base text-gray-800">
                          {insurance.name}
                        </h4>
                      </div>
                      <span className="text-blue-600 font-bold text-lg">
                        {insurance.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {insurance.description}
                    </p>
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={14} />
                        {insurance.duration}
                      </p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        Что покрывается:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {insurance.coverage.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                        {insurance.coverage.length > 3 && (
                          <li className="text-blue-600">
                            +{insurance.coverage.length - 3} еще...
                          </li>
                        )}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Отмена
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedInsurance}
                  className="flex-1"
                >
                  Далее
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Оплата */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Детали покупки
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Страховая компания:</span>
                    <span className="font-semibold">
                      {selectedInsurance?.provider}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">План:</span>
                    <span className="font-semibold">
                      {selectedInsurance?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Период:</span>
                    <span className="font-semibold">
                      {selectedInsurance?.duration}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-300">
                    <span className="text-gray-800 font-semibold">
                      Ежемесячный платеж:
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {selectedInsurance?.price}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Способ оплаты
                </h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                        selectedPayment === method.id
                          ? "border-2 border-blue-600 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-semibold">{method.name}</p>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  ℹ️ После подтверждения вы получите электронное письмо с
                  инструкциями по активации страховки и оплате.
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
                  onClick={handlePurchase}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Оформить страховку
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};