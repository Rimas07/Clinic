import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { StaggeredContainer } from "../../../../components/ui/animated";
import { Modal } from "../../../../components/ui/modal";
import { Auth, signOutUser, useAuthState } from "../../../../auth/auth";
import { User } from "firebase/auth";
import { useI18n } from "../../../../lib/i18n";
import { Language } from "../../../../lib/translations";

const languages = [
  { code: "en" as Language, name: "English" },
  { code: "cs" as Language, name: "Čeština" },
  { code: "ru" as Language, name: "Русский" },
];

const socialLinks = [
  {
    type: "video",
    src: "/facebook.mp4",
    alt: "Facebook",
    href: "https://facebook.com",
  },
  {
    type: "video",
    src: "/instagram.mp4",
    alt: "Instagram",
    href: "https://instagram.com",
  },
];

export const HeaderSubsection = () => {
  const { t, language, setLanguage } = useI18n();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const selectedLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  const navigationItems = [
    { label: t.header.clinic },
    { label: t.header.consultation },
    { label: t.header.laboratory },
    { label: t.header.blog },
    { label: t.header.insurances },
  ];

  useEffect(() => {
    const unsubscribe = useAuthState((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <header className="relative w-full bg-transparent">
      <div className="relative w-full h-[120px] bg-white">
        <div className="flex items-center justify-between w-full h-full px-6 lg:px-12">
          <div className="flex items-center translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
            <img
              className="w-[80px] h-[100px] object-contain"
              alt="Logo"
              src="https://c.animaapp.com/mgtmgk76jUYvZ3/img/emxn1y8qsqogdxbsb2fkeg55bgfilxn0dw50lxnncbova2xpbmcvzg93bmxvywqv-1.png"
            />
          </div>

          <nav className="flex items-center gap-8">
            <StaggeredContainer
              staggerDelay={0.1}
              animation="fadeInUp"
              className="flex items-center gap-8"
            >
              {navigationItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto px-4 py-2 [font-family:'Inter',Helvetica] font-normal text-[#0d141a] text-base tracking-[0] leading-6 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover-scale rounded-lg"
                >
                  {item.label}
                </Button>
              ))}
            </StaggeredContainer>
          </nav>

          <div className="flex items-center gap-6">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              >
                <span className="[font-family:'Inter',Helvetica] font-normal text-[#0d141a] text-sm">
                  {selectedLanguage.code.toUpperCase()}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLanguageDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLanguageDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[160px] overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition-colors text-left ${
                          selectedLanguage.code === lang.code
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <span className="[font-family:'Inter',Helvetica] font-normal text-[#0d141a] text-sm">
                          {lang.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <StaggeredContainer
              staggerDelay={0.15}
              animation="fadeInRight"
              className="flex items-center gap-3"
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 rounded-full transition-all duration-300 hover-scale hover-glow"
                >
                  {link.type === "video" ? (
                    <video
                      className="w-12 h-12 object-cover rounded-full"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={link.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      alt={link.alt}
                      src={link.src}
                    />
                  )}
                </a>
              ))}
            </StaggeredContainer>

            {/* Auth Button */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm">
                    {user.email}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="h-auto px-4 py-2 [font-family:'Inter',Helvetica] font-normal text-[#0d141a] text-sm tracking-[0] leading-6 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300 hover-scale rounded-lg"
                  >
                    {t.header.signOut}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="h-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 hover-scale hover-glow"
                >
                  {t.header.signIn}
                </Button>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-4">
                +42011111111
              </span>
              <span className="[font-family:'Inter',Helvetica] font-normal text-black text-sm tracking-[0] leading-4">
                test@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        <Auth onClose={() => setIsAuthModalOpen(false)} />
      </Modal>
    </header>
  );
};
