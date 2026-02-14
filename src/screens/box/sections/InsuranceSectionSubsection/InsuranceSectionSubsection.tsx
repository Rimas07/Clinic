import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { InsuranceModal } from "../../../../components/ui/modal";
import { useI18n } from "../../../../lib/i18n";
import { BookingModal } from "../../../../components/ui/booking-modal";
import { InsuranceBookingModal } from "../../../../components/ui/insurance-booking-modal";
import { getPublicAssetUrl } from "../../../../lib/utils";
const insuranceLogos = [
  {
    src: getPublicAssetUrl("AXA_Logo.svg 2.png"),
    alt: "AXA Insurance",
    className: "w-[100px] h-[100px]",
    insurance: {
      name: "AXA Smart Coverage",
      logo: getPublicAssetUrl("AXA_Logo.svg 2.png"),
      description:
        "Comprehensive health insurance coverage designed for expats and international residents in the Czech Republic. AXA provides reliable protection with extensive network coverage.",
      duration: "12 months coverage",
      coverage: [
        "Emergency medical treatment",
        "Hospitalization and surgery",
        "Prescription medications",
        "Dental care (basic)",
        "Mental health support",
        "Preventive check-ups",
      ],
      price: "€89",
      features: [
        "24/7 multilingual support",
        "Direct billing with hospitals",
        "Online claims processing",
        "Mobile app for easy management",
      ],
    },
  },
  {
    src: getPublicAssetUrl("uniq logo.png"),
    alt: "UNIQA Insurance",
    className: "w-[100px] h-[100px]",
    insurance: {
      name: "UNIQA Health Plus",
      logo: getPublicAssetUrl("uniq logo.png"),
      description:
        "Premium health insurance with comprehensive coverage for individuals and families. UNIQA offers flexible plans tailored to your specific healthcare needs.",
      duration: "6-24 months flexible",
      coverage: [
        "Full medical consultations",
        "Specialist treatments",
        "Diagnostic procedures",
        "Emergency services",
        "Maternity care",
        "Chronic disease management",
      ],
      price: "€125",
      features: [
        "Family discounts available",
        "No waiting periods",
        "Worldwide emergency coverage",
        "Telemedicine consultations",
      ],
    },
  },
  {
    src: getPublicAssetUrl("pvzp .png"),
    alt: "PVZP Insurance",
    className: "w-[100px] h-[100px]",
    insurance: {
      name: "PVZP Comprehensive",
      logo: getPublicAssetUrl("pvzp .png"),
      description:
        "Leading Czech insurance provider offering extensive healthcare coverage with deep local expertise and comprehensive medical network access.",
      duration: "12 months standard",
      coverage: [
        "Complete medical care",
        "Rehabilitation services",
        "Alternative medicine",
        "Vision and hearing care",
        "Mental health services",
        "Preventive programs",
      ],
      price: "€95",
      features: [
        "Local Czech network",
        "Traditional medicine coverage",
        "Wellness programs",
        "Health monitoring tools",
      ],
    },
  },
  {
    src: getPublicAssetUrl("maxima logo.png"),
    alt: "MAXIMA Insurance",
    className: "w-[100px] h-[100px]",
    insurance: {
      name: "MAXIMA Premium",
      logo: getPublicAssetUrl("maxima logo.png"),
      description:
        "High-quality health insurance with premium benefits and exceptional customer service. MAXIMA focuses on providing comprehensive coverage with personalized care.",
      duration: "12-36 months",
      coverage: [
        "Premium medical facilities",
        "Executive health programs",
        "International treatment",
        "Concierge medical services",
        "Second opinion consultations",
        "Health screenings",
      ],
      price: "€150",
      features: [
        "Priority appointments",
        "International coverage",
        "Personal health advisor",
        "Luxury hospital access",
      ],
    },
  },
  {
    src: getPublicAssetUrl("slavia logo.png"),
    alt: "SLAVIA Insurance",
    className: "w-[100px] h-[100px]",
    insurance: {
      name: "SLAVIA Essential",
      logo: getPublicAssetUrl("slavia logo.png"),
      description:
        "Affordable and reliable health insurance solution for students and young professionals. SLAVIA provides essential coverage at competitive rates.",
      duration: "6-12 months",
      coverage: [
        "Basic medical consultations",
        "Emergency treatment",
        "Essential medications",
        "Basic dental care",
        "Emergency dental",
        "Health check-ups",
      ],
      price: "€65",
      features: [
        "Student-friendly rates",
        "Easy online enrollment",
        "Quick claims processing",
        "Basic mobile app",
      ],
    },
  },
];

export const InsuranceSectionSubsection = () => {
  const { t } = useI18n();
  const [selectedInsurance, setSelectedInsurance] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [isInsuranceBookingOpen, setIsInsuranceBookingOpen] = useState(false);
  const features = [
    {
      icon: "🕐",
      emoji: null,
      title: t.insurance.instantCoverage,
      description: t.insurance.instantCoverageDesc,
      bgColor: "bg-blue-500",
      highlighted: false,
    },
    {
      icon: "30%",
      emoji: null,
      title: t.insurance.saveUpTo,
      description: t.insurance.saveUpToDesc,
      bgColor: "bg-green-500",
      highlighted: false,
    },
    {
      icon: "❄️",
      emoji: null,
      title: t.insurance.smartInsurance,
      description: t.insurance.smartInsuranceDesc,
      bgColor: "bg-blue-500",
      highlighted: true,
    },
  ];

  const handleInsuranceClick = (insurance: any) => {
    setSelectedInsurance(insurance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInsurance(null);
  };

  return (
    <section className="relative w-full py-16 bg-blue-50 overflow-hidden">
      {/* Иллюстрация справа - используем существующее изображение */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-full pointer-events-none z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          <img className="w-50 h-50" alt="Mask group" src={getPublicAssetUrl("pic loog.png")} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pr-96">
        {/* Заголовок секции */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t.insurance.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t.insurance.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-12 mb-16 overflow-hidden rounded-[20px]">
          {insuranceLogos.map((logo, index) => (
            <img
              key={index}
              className={`${logo.className} object-cover hover-scale transition-transform duration-300 cursor-pointer hover-glow`}
              alt={logo.alt}
              src={logo.src}
              onClick={() => handleInsuranceClick(logo.insurance)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-start justify-center gap-8 w-full max-w-5xl">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`flex-1 hover-lift transition-all duration-300 ${
                  feature.highlighted
                    ? "bg-white shadow-lg border border-gray-200 hover-glow"
                    : "bg-white shadow-md border border-gray-100 hover:shadow-lg"
                }`}
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${
                      feature.bgColor || "bg-gray-100"
                    }`}
                  >
                    {feature.icon === "30%" ? (
                      <span className="text-sm font-bold text-white">
                        {feature.icon}
                      </span>
                    ) : (
                      <span className="text-2xl leading-8">{feature.icon}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-gray-900 text-base leading-6">
                      {feature.title}
                    </h3>
                    <p className="font-normal text-gray-600 text-sm leading-5">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
  onClick={() => setIsInsuranceBookingOpen(true)}
  className="h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-[200px] px-10 py-[18px] hover-lift hover-glow transition-all duration-300"
>
  <span className="[font-family:'Roboto',Helvetica] font-semibold text-white text-base leading-6">
    {t.insurance.buyInsurance}
  </span>
</Button>
        </div>
      </div>

      {/* Insurance Modal */}
      <InsuranceBookingModal
  isOpen={isInsuranceBookingOpen}
  onClose={() => setIsInsuranceBookingOpen(false)}
/>
    </section>
  );
};
