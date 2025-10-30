import React from "react";
import { useI18n } from "../../../../lib/i18n";

const galleryImages = [
  {
    src: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/image.png",
    alt: "Clinic interior view 1",
  },
  {
    src: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/image-1.png",
    alt: "Clinic interior view 2",
  },
  {
    src: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/photo-2025-10-12-13-24-07-1.png",
    alt: "Happy patient photo",
  },
  {
    src: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/a-well-lit-hallway-showcasing-modern-medical-equipment-.png",
    alt: "Well-lit hallway with medical equipment",
  },
];

export const ImageOfClinicAndSubsection = () => {
  const { t } = useI18n();
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="text-center mb-16 translate-y-[-1rem] animate-fade-in opacity-0">
          <h2 className="[font-family:'Outfit',Helvetica] font-semibold text-[#1d1e20] text-5xl tracking-[0] leading-[62.4px] mb-4">
            {t.gallery.title}
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#1a1a1c] text-base tracking-[0] leading-6">
            {t.gallery.description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-2xl transition-transform hover:scale-[1.02] duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
