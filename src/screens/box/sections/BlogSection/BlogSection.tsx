import React from "react";
import { useI18n } from "../../../../lib/i18n";
import { Card, CardContent } from "../../../../components/ui/card";

interface BlogSectionProps {
  onArticleClick?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onArticleClick }) => {
  const { t } = useI18n();

  const blogCards = [
    {
      title: t.blog.osteoArthritis,
      icon: "🦴",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-200",
    },
    {
      title: t.blog.healthyHeart,
      icon: "❤️",
      bgColor: "bg-pink-100",
      hoverColor: "hover:bg-pink-200",
    },
    {
      title: t.blog.avoidFlu,
      icon: "🦠",
      bgColor: "bg-yellow-100",
      hoverColor: "hover:bg-yellow-200",
    },
    {
      title: t.blog.healthcareCzech,
      icon: "🇨🇿",
      bgColor: "bg-gray-100",
      hoverColor: "hover:bg-gray-200",
    },
    {
      title: t.blog.diabetesDetection,
      icon: "🩸",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
    },
    {
      title: t.blog.hypertensionDetection,
      icon: "💊",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="[font-family:'Outfit',Helvetica] font-semibold text-[#1d1e20] text-5xl tracking-[0] leading-[62.4px] mb-6">
            {t.blog.title}
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#56585e] text-lg tracking-[0] leading-7 max-w-4xl mx-auto">
            {t.blog.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogCards.map((card, index) => (
            <Card
              key={index}
              onClick={onArticleClick}
              className={`${card.bgColor} ${card.hoverColor} border-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover-lift hover-scale`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl flex-shrink-0">{card.icon}</div>
                  <div className="flex-1">
                    <h3 className="[font-family:'Roboto',Helvetica] font-semibold text-[#1d1e20] text-lg leading-6">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* DNA Illustration */}
        <div className="relative bg-gradient-to-b from-blue-900 to-blue-800 rounded-3xl p-8 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-block bg-blue-700/50 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                {/* DNA Helix */}
                <svg
                  className="w-32 h-32 text-blue-300"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M20 20 Q50 40, 80 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M20 80 Q50 60, 80 80"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line
                    x1="30"
                    y1="25"
                    x2="70"
                    y2="75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="70"
                    y1="25"
                    x2="30"
                    y2="75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col gap-2">
                <div className="w-16 h-16 bg-blue-700/50 backdrop-blur-sm rounded-lg"></div>
                <div className="w-12 h-12 bg-blue-600/50 backdrop-blur-sm rounded-lg ml-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
