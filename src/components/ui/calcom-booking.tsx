import React, { useEffect } from "react";
import { X } from "lucide-react";

interface CalComBookingProps {
  isOpen: boolean;
  onClose: () => void;
  calLink?: string; // например: "your-clinic/consultation"
}

/**
 * Компонент для интеграции Cal.com
 *
 * Инструкция по настройке:
 * 1. Зарегистрируйтесь на https://cal.com
 * 2. Создайте событие (event type) для каждой услуги
 * 3. Получите ссылку вида: username/event-slug
 * 4. Установите: npm install @calcom/embed-react
 * 5. Используйте этот компонент
 */
export const CalComBooking: React.FC<CalComBookingProps> = ({
  isOpen,
  onClose,
  calLink = "demo/30min", // Демо-ссылка
}) => {
  useEffect(() => {
    if (isOpen) {
      // Загрузка Cal.com embed скрипта
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl m-4 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Запись на прием</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cal.com Embed */}
        <div className="p-4 overflow-y-auto" style={{ height: "calc(90vh - 80px)" }}>
          {/* Inline embed */}
          <div
            data-cal-link={calLink}
            data-cal-config='{"layout":"month_view","theme":"light"}'
            style={{ width: "100%", height: "100%", minHeight: "600px" }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Альтернатива: Popup embed
 * Просто добавьте кнопку с атрибутом data-cal-link
 */
export const CalComButton: React.FC<{ calLink: string; children: React.ReactNode }> = ({
  calLink,
  children,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
    >
      {children}
    </button>
  );
};
