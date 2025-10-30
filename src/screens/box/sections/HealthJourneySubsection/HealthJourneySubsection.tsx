import { CheckIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useI18n } from "../../../../lib/i18n";

export const HealthJourneySubsection = () => {
  const { t } = useI18n();

  const featureCards = [
    {
      title: t.healthJourney.primeLocation,
      description: t.healthJourney.primeLocationDesc,
      bgColor: "bg-[#e6f0fc]",
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qtqogdxbsb2fkeg55bgfilxn0dw50lxnncboza2xpbmcvzg93bmxvywqv-3.png",
    },
    {
      title: t.healthJourney.sameDayBooking,
      description: t.healthJourney.sameDayBookingDesc,
      bgColor: "bg-[#e9f9f0]",
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qtqogdxbsb2fkeg55bgfilxn0dw50lxnncboza2xpbmcvzg93bmxvywqv-2.png",
    },
    {
      title: t.healthJourney.allInOne,
      description: t.healthJourney.allInOneDesc,
      bgColor: "bg-[#fff5e6]",
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qtqogdxbsb2fkeg55bgfilxn0dw50lxnncboza2xpbmcvzg93bmxvywqv-1.png",
    },
    {
      title: t.healthJourney.boardCertified,
      description: t.healthJourney.boardCertifiedDesc,
      bgColor: "bg-[#f7f1ff]",
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qtqogdxbsb2fkeg55bgfilxn0dw50lxnncboza2xpbmcvzg93bmxvywqv-4.png",
    },
  ];

  const bulletPoints = [
    t.healthJourney.extendedHours,
    t.healthJourney.freeParking,
    t.healthJourney.englishSpeaking,
    t.healthJourney.digitalRecords,
  ];
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 translate-y-[-1rem] animate-fade-in opacity-0">
            <div className="space-y-6">
              <h2 className="[font-family:'Outfit',Helvetica] font-semibold text-[#1d1e20] text-5xl leading-[62.4px]">
                {t.healthJourney.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t.healthJourney.title.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#56585e] text-base leading-6">
                {t.healthJourney.description.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t.healthJourney.description.split("\n").length - 1 && (
                      <br />
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
              {featureCards.map((card, index) => (
                <Card
                  key={index}
                  className={`${card.bgColor} border-0 rounded-lg overflow-visible`}
                >
                  <CardContent className="p-6 pt-12 relative">
                    <img
                      className="absolute -top-6 left-6 w-[70px] h-[70px] object-cover"
                      alt={card.title}
                      src={card.icon}
                    />
                    <h3 className="[font-family:'Roboto',Helvetica] font-semibold text-[#1a1a1a] text-base leading-6 mb-2">
                      {card.title}
                    </h3>
                    <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4a5568] text-sm leading-5">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckIcon className="w-4 h-4 mt-1 text-blue-800 flex-shrink-0" />
                  <p className="[font-family:'Roboto',Helvetica] font-normal text-blue-800 text-base leading-6">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white rounded-full px-8 h-auto py-4 [font-family:'Roboto',Helvetica] font-semibold text-base transition-colors">
                {t.healthJourney.bookNow}
              </Button>
              <Button
                variant="outline"
                className="border-blue-800 text-blue-800 hover:bg-blue-50 rounded-full px-8 h-auto py-4 [font-family:'Roboto',Helvetica] font-semibold text-base transition-colors"
              >
                {t.healthJourney.virtualTour}
              </Button>
            </div>
          </div>

          <div className="lg:mt-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
            <Card className="border-0 rounded-[20px] overflow-hidden shadow-lg">
              <CardContent className="p-0 relative">
                <div className="relative h-[544px] w-full">
                  <img
                    className="w-full h-full object-cover"
                    alt="Clinic interior"
                    src="https://c.animaapp.com/mgtmgk76jUYvZ3/img/a-bright--welcoming-clinic-with-doctors-engaging-with-patients-.png"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <p className="[font-family:'Outfit',Helvetica] text-[#1d1e20] text-lg leading-[23.4px] font-black mb-2">
                        {t.healthJourney.testimonial}
                      </p>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-[#56585e] text-base leading-6">
                        {t.healthJourney.testimonialAuthor}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
