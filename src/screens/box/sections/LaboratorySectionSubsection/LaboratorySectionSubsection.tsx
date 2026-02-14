import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { useI18n } from "../../../../lib/i18n";
import { Card, CardContent } from "../../../../components/ui/card";
import { LaboratoryBookingModal } from "../../../../components/ui/laboratory-booking-modal";
import { getPublicAssetUrl } from "../../../../lib/utils";

export const LaboratorySectionSubsection = () => {
  const { t } = useI18n();
const [isLabBookingOpen, setIsLabBookingOpen] = useState(false);
  const testCategories = [
    {
      title: t.laboratory.bloodTests,
      description: t.laboratory.bloodTestsDesc,
      icon: "🩸",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: t.laboratory.urinalysis,
      description: t.laboratory.urinalysisDesc,
      icon: "🧪",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: t.laboratory.biochemistry,
      description: t.laboratory.biochemistryDesc,
      icon: "⚗️",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: t.laboratory.microbiology,
      description: t.laboratory.microbiologyDesc,
      icon: "🔬",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: t.laboratory.hormonalTests,
      description: t.laboratory.hormonalTestsDesc,
      icon: "🧬",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: t.laboratory.diagnosticPanels,
      description: t.laboratory.diagnosticPanelsDesc,
      icon: "❤️",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
  ];

  const features = [
    t.laboratory.fastResults,
    t.laboratory.accurateTesting,
    t.laboratory.modernEquipment,
    t.laboratory.certifiedLab,
  ];

  return (
    <section className="relative w-full py-16">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Title Section - Centered */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <h2 className="[font-family:'Outfit',Helvetica] font-semibold text-[#1d1e20] text-5xl text-center tracking-[0] leading-[62.4px]">
            {t.laboratory.title}
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#56585e] text-xl text-center tracking-[0] leading-6 max-w-[569px]">
            {t.laboratory.description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < t.laboratory.description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Content with Image Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Content */}
          <div className="space-y-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg order-2 lg:order-1">
            <div>
              <h3 className="[font-family:'Roboto',Helvetica] font-bold text-[#1d1e20] text-2xl mb-3">
                {t.laboratory.sectionTitle}
              </h3>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#56585e] text-sm leading-5 mb-6">
                {t.laboratory.sectionDescription}
              </p>
            </div>

            {/* Test Categories - Compact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {testCategories.map((test, index) => (
                <Card
                  key={index}
                  className={`${test.bgColor} border-0 rounded-lg overflow-hidden transition-all duration-300 hover-lift hover-scale`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <div
                        className={`${test.iconBg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg`}
                      >
                        {test.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="[font-family:'Roboto',Helvetica] font-semibold text-[#1d1e20] text-sm mb-1">
                          {test.title}
                        </h4>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-[#56585e] text-xs leading-4 line-clamp-2">
                          {test.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features List - Compact */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#1d1e20] text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Button 
  onClick={() => setIsLabBookingOpen(true)}
  className="bg-blue-800 hover:bg-blue-900 rounded-[200px] h-[50px] px-6 [font-family:'Roboto',Helvetica] font-semibold text-white text-sm tracking-[0] transition-colors"
>
  {t.laboratory.scheduleTest}
</Button> 
          </div>

          {/* Right Column - Image */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <img
              alt="Laboratory scientist"
              src={getPublicAssetUrl("lab  pic.png")}
              className="w-full h-auto max-w-full"
              style={{
                maxHeight: "600px",
                objectFit: "contain",
                objectPosition: "center",
              }}
              loading="eager"
            />
          </div>
        </div>
      </div>
     <LaboratoryBookingModal
  isOpen={isLabBookingOpen}
  onClose={() => setIsLabBookingOpen(false)}
/>
    </section>
  );
};
