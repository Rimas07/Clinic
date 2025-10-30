import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { DoctorModal } from "../../../../components/ui/modal";
import { useI18n } from "../../../../lib/i18n";

export const ConsultationSectionSubsection = () => {
  const { t } = useI18n();

  const featureCards = [
    {
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/frames-4.svg",
      title: t.consultation.flexibleHours,
      description: t.consultation.flexibleHoursDesc,
    },
    {
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/frames-1.svg",
      title: t.consultation.expertTeam,
      description: t.consultation.expertTeamDesc,
    },
    {
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/frames.svg",
      title: t.consultation.thoroughExams,
      description: t.consultation.thoroughExamsDesc,
    },
    {
      icon: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/frames-2.svg",
      title: t.consultation.patientCare,
      description: t.consultation.patientCareDesc,
    },
  ];

  const specialties = [
    {
      image: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/cardiology.png",
      label: t.consultation.cardiology,
      colors: {
        primary: "from-red-50 to-pink-100",
        accent: "from-red-400 to-red-600",
        secondary: "from-pink-400 to-pink-600",
        text: "text-red-600",
      },
      doctor: {
        name: "Dr. Anna Kowalski",
        specialty: "Cardiologist",
        photo:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        education: [
          "Medical University of Prague - MD",
          "Charles University - Cardiology Residency",
          "Harvard Medical School - Advanced Cardiology Fellowship",
        ],
        experience:
          "15+ years of experience in cardiovascular medicine, specializing in interventional cardiology and heart failure management.",
        description:
          "Dr. Kowalski is a highly experienced cardiologist with extensive training in both Europe and the United States. She specializes in preventive cardiology and has published numerous research papers on cardiovascular disease prevention.",
        languages: ["English", "Czech", "German", "Polish"],
      },
    },
    {
      image: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/urology.png",
      label: t.consultation.urology,
      colors: {
        primary: "from-yellow-50 to-amber-100",
        accent: "from-yellow-400 to-yellow-600",
        secondary: "from-amber-400 to-amber-600",
        text: "text-yellow-600",
      },
      doctor: {
        name: "Dr. Michael Novak",
        specialty: "Urologist",
        photo:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
        education: [
          "Masaryk University - MD",
          "University Hospital Brno - Urology Residency",
          "Johns Hopkins Hospital - Urologic Oncology Fellowship",
        ],
        experience:
          "12+ years specializing in urologic oncology, minimally invasive surgery, and men's health.",
        description:
          "Dr. Novak is a leading urologist with expertise in robotic surgery and urologic oncology. He has performed over 1000 minimally invasive procedures and is known for his patient-centered approach.",
        languages: ["English", "Czech", "Slovak"],
      },
    },
    {
      image: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/gp.png",
      label: t.consultation.generalPractitioner,
      colors: {
        primary: "from-green-50 to-emerald-100",
        accent: "from-green-400 to-green-600",
        secondary: "from-emerald-400 to-emerald-600",
        text: "text-green-600",
      },
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "General Practitioner",
        photo:
          "https://images.unsplash.com/photo-1594824388852-8b5dfbb4b3d1?w=400&h=400&fit=crop&crop=face",
        education: [
          "University of Cambridge - MBBS",
          "Royal College of General Practitioners - CCT",
          "Imperial College London - Family Medicine Fellowship",
        ],
        experience:
          "18+ years in family medicine, with special interest in preventive care and chronic disease management.",
        description:
          "Dr. Johnson provides comprehensive primary care services with a focus on preventive medicine and patient education. She has extensive experience working with international patients.",
        languages: ["English", "Czech", "French"],
      },
    },
    {
      image: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/5-1.png",
      label: t.consultation.endocrinology,
      colors: {
        primary: "from-orange-50 to-yellow-100",
        accent: "from-orange-400 to-orange-600",
        secondary: "from-yellow-400 to-yellow-600",
        text: "text-orange-600",
      },
      doctor: {
        name: "Dr. Tomas Svoboda",
        specialty: "Endocrinologist",
        photo:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
        education: [
          "Charles University - MD",
          "General University Hospital Prague - Endocrinology Residency",
          "Mayo Clinic - Diabetes and Metabolism Fellowship",
        ],
        experience:
          "14+ years specializing in diabetes management, thyroid disorders, and metabolic diseases.",
        description:
          "Dr. Svoboda is an expert in diabetes care and metabolic disorders. He has been instrumental in developing diabetes management programs and has published extensively on insulin therapy.",
        languages: ["English", "Czech", "German"],
      },
    },
    {
      image: "https://c.animaapp.com/mgtmgk76jUYvZ3/img/4-1.png",
      label: t.consultation.orthopedics,
      colors: {
        primary: "from-purple-50 to-violet-100",
        accent: "from-purple-400 to-purple-600",
        secondary: "from-violet-400 to-violet-600",
        text: "text-purple-600",
      },
      doctor: {
        name: "Dr. Petra Müller",
        specialty: "Orthopedic Surgeon",
        photo:
          "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face",
        education: [
          "Technical University Munich - MD",
          "University Hospital Munich - Orthopedic Surgery Residency",
          "Hospital for Special Surgery NYC - Sports Medicine Fellowship",
        ],
        experience:
          "16+ years in orthopedic surgery, specializing in sports medicine and joint replacement surgery.",
        description:
          "Dr. Müller is a renowned orthopedic surgeon with expertise in minimally invasive procedures and sports medicine. She has treated professional athletes and is known for her innovative surgical techniques.",
        languages: ["English", "German", "Czech"],
      },
    },
    {
      image:
        "https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qsqogdxbsb2fkeg55bgfilxn0dw50lxnncbova2xpbmcvzg93bmxvywqv.png",
      label: t.consultation.ultrasound,
      colors: {
        primary: "from-cyan-50 to-blue-100",
        accent: "from-cyan-400 to-cyan-600",
        secondary: "from-blue-400 to-blue-600",
        text: "text-cyan-600",
      },
      doctor: {
        name: "Dr. Elena Rodriguez",
        specialty: "Radiologist & Ultrasound Specialist",
        photo:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=face",
        education: [
          "University of Barcelona - MD",
          "Hospital Clínic Barcelona - Radiology Residency",
          "Cleveland Clinic - Advanced Imaging Fellowship",
        ],
        experience:
          "13+ years in diagnostic imaging, with expertise in ultrasound, MRI, and CT imaging.",
        description:
          "Dr. Rodriguez is a highly skilled radiologist specializing in ultrasound diagnostics. She has extensive experience in obstetric ultrasound, abdominal imaging, and vascular studies.",
        languages: ["English", "Spanish", "Czech", "Catalan"],
      },
    },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialtyClick = (specialty: any) => {
    setSelectedDoctor(specialty.doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <section className="relative w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms] flex-shrink-0 lg:w-[500px] ml-auto">
            <img
              className="w-full h-auto object-cover"
              alt="Doctor consultation"
              src="https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qtqogdxbsb2fkeg55bgfilxn0dw50lxnncboza2xpbmcvzg93bmxvywqv.png"
            />
          </div>

          <div className="flex-1">
            <h2 className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] [font-family:'Roboto',Helvetica] font-normal text-gray-900 text-2xl tracking-[0] leading-8 mb-6">
              {t.consultation.title}
            </h2>

            <p className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-2xl tracking-[0] leading-5 mb-12">
              {t.consultation.description.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t.consultation.description.split("\n").length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {featureCards.map((feature, index) => (
                <Card
                  key={index}
                  className="translate-y-[-1rem] animate-fade-in opacity-0 border border-solid"
                  style={
                    {
                      "--animation-delay": `${400 + index * 100}ms`,
                    } as React.CSSProperties
                  }
                >
                  <CardContent className="flex gap-4 p-4">
                    <img
                      className="w-10 h-10"
                      alt={feature.title}
                      src={feature.icon}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="[font-family:'Roboto',Helvetica] font-semibold text-gray-900 text-sm tracking-[0] leading-5">
                        {feature.title}
                      </div>
                      <div className="[font-family:'Roboto',Helvetica] font-normal text-gray-500 text-xs tracking-[0] leading-4">
                        {feature.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="translate-y-[-1rem] animate-fade-in opacity-0 flex flex-col items-center gap-4 cursor-pointer group"
                  style={
                    {
                      "--animation-delay": `${800 + index * 100}ms`,
                    } as React.CSSProperties
                  }
                  onClick={() => handleSpecialtyClick(specialty)}
                >
                  {/* Icon Container with Gradient Background */}
                  <div
                    className={`relative p-6 bg-gradient-to-br ${specialty.colors.primary} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-2`}
                  >
                    {/* Decorative Elements */}
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${specialty.colors.accent} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <div
                      className={`absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br ${specialty.colors.secondary} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
                    ></div>

                    {/* Main Icon */}
                    <div className="relative z-10">
                      <img
                        className="w-20 h-20 object-cover rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300"
                        alt={specialty.label}
                        src={specialty.image}
                      />

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${specialty.colors.accent}/20 ${specialty.colors.secondary}/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}
                      >
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg
                            className={`w-6 h-6 ${specialty.colors.text}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Label with Enhanced Styling */}
                  <div className="text-center">
                    <h3
                      className={`font-semibold text-gray-800 text-lg tracking-wide group-hover:${specialty.colors.text} transition-colors duration-300`}
                    >
                      {specialty.label}
                    </h3>
                    <div
                      className={`mt-1 w-12 h-0.5 bg-gradient-to-r ${specialty.colors.accent} ${specialty.colors.secondary} mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t.consultation.clickToView}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button className="h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-[200px] px-14 py-4 hover-lift hover-glow transition-all duration-300 animate-pulse-slow">
                <span className="[font-family:'Roboto',Helvetica] font-semibold text-white text-base tracking-[0] leading-6">
                  {t.consultation.bookNow}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Modal */}
      <DoctorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        doctor={selectedDoctor}
      />
    </section>
  );
};
