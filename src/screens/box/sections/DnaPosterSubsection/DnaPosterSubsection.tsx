import React from "react";
import { Button } from "../../../../components/ui/button";
import { useI18n } from "../../../../lib/i18n";

export const DnaPosterSubsection = () => {
  const { t } = useI18n();
  return (
    <section className="w-full bg-white">
      <div className="w-full flex justify-center">
        <div className="relative">
          <video
            style={{
              width: "1550px",
              height: "428px",
              minWidth: "1550px",
              minHeight: "428px",
              maxWidth: "1550px",
              maxHeight: "428px",
              objectFit: "cover",
              display: "block",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play();
            }}
          >
            <source src="/dna-poster-video.mp4" type="video/mp4" />
            <source src="/dna-poster-video.webm" type="video/webm" />
            Ваш браузер не поддерживает видео.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              {/* Main Title */}
              <h1 className="text-5xl font-bold mb-4 text-white">
                {t.dnaPoster.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t.dnaPoster.subtitle}
              </p>

              {/* Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium"
                >
                  {t.dnaPoster.scheduleNow}
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium">
                  {t.dnaPoster.learnMore}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
