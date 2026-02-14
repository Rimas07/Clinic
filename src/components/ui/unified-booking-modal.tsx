import React, { useState } from "react";
import { X, Stethoscope, Shield, Microscope } from "lucide-react";
import { Card } from "./card";
import { BookingModal } from "./booking-modal";
import { InsuranceBookingModal } from "./insurance-booking-modal";
import { LaboratoryBookingModal } from "./laboratory-booking-modal";

interface UnifiedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "consultation" | "insurance" | "laboratory" | null;

export const UnifiedBookingModal: React.FC<UnifiedBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  const categories = [
    {
      id: "consultation" as const,
      title: "Консультации врачей",
      description: "Запись к специалистам: кардиолог, уролог, терапевт и др.",
      icon: Stethoscope,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: "insurance" as const,
      title: "Медицинская страховка",
      description: "Оформление чешских страховок: VZP, PVZP, AXA, UNIQA",
      icon: Shield,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      id: "laboratory" as const,
      title: "Лабораторные анализы",
      description: "Запись на анализы: кровь, моча, гормоны, витамины",
      icon: Microscope,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-600",
    },
  ];

  const handleCategorySelect = (categoryId: Category) => {
    setSelectedCategory(categoryId);
  };

  const handleCloseCategoryModal = () => {
    setSelectedCategory(null);
  };

  const handleCloseAll = () => {
    setSelectedCategory(null);
    onClose();
  };

  if (!isOpen) return null;

  // Если категория выбрана, показываем соответствующую модалку
  if (selectedCategory === "consultation") {
    return (
      <BookingModal
        isOpen={true}
        onClose={() => {
          handleCloseCategoryModal();
          onClose();
        }}
      />
    );
  }

  if (selectedCategory === "insurance") {
    return (
      <InsuranceBookingModal
        isOpen={true}
        onClose={() => {
          handleCloseCategoryModal();
          onClose();
        }}
      />
    );
  }

  if (selectedCategory === "laboratory") {
    return (
      <LaboratoryBookingModal
        isOpen={true}
        onClose={() => {
          handleCloseCategoryModal();
          onClose();
        }}
      />
    );
  }

  // Иначе показываем выбор категории
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleCloseAll}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl m-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Онлайн запись</h2>
              <p className="text-white/90 text-sm">
                Выберите категорию для записи
              </p>
            </div>
            <button
              onClick={handleCloseAll}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`${category.bgColor} border-0 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 group overflow-hidden relative`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative p-6 flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div
                      className={`${category.iconBg} w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent
                        size={40}
                        className={category.textColor}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold ${category.textColor} group-hover:scale-105 transition-transform duration-300`}
                    >
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    {/* Arrow indicator */}
                    <div
                      className={`mt-4 ${category.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 font-semibold`}
                    >
                      <span>Выбрать</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Info section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Как это работает?
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Выберите нужную категорию</li>
                  <li>✓ Заполните необходимую информацию</li>
                  <li>✓ Подтвердите запись или покупку</li>
                  <li>✓ Получите подтверждение на email/SMS</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Специалистов</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">Страховых компаний</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600">100+</div>
              <div className="text-sm text-gray-600">Видов анализов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};