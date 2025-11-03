import React, { useState } from "react";
import { Calendar, Clock, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { BookingModal } from "../../../../components/ui/booking-modal";

export const BookingSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Выбор услуги",
      description: "Широкий спектр медицинских услуг",
    },
    {
      icon: Clock,
      title: "Удобное время",
      description: "Выберите удобное время для визита",
    },
    {
      icon: CreditCard,
      title: "Онлайн оплата",
      description: "Безопасная оплата картой",
    },
  ];

  return (
    <section className="w-full py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Онлайн запись на прием
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Запишитесь на консультацию к специалисту за несколько кликов.
            Выберите услугу, время и оплатите онлайн.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            Записаться на прием
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={24}
            />
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Или позвоните нам:{" "}
            <a
              href="tel:+74951234567"
              className="text-blue-600 hover:underline font-semibold"
            >
              +7 (495) 123-45-67
            </a>
          </p>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
