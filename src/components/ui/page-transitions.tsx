import React, { useState } from "react";

export type SectionType =
  | "header"
  | "dna-poster"
  | "health-journey"
  | "consultation"
  | "insurance"
  | "blog"
  | "laboratory"
  | "gallery"
  | "end";

interface SectionTransitionProps {
  children: React.ReactNode;
  sectionId: SectionType;
  isActive: boolean;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  sectionId,
  isActive,
  className = "",
}) => {
  if (!isActive) return null;

  return <div className={`${className}`}>{children}</div>;
};

interface PageTransitionManagerProps {
  children: React.ReactNode;
  currentSection: SectionType;
}

export const PageTransitionManager: React.FC<PageTransitionManagerProps> = ({
  children,
  currentSection,
}) => {
  const sections: SectionType[] = [
    "header",
    "dna-poster",
    "health-journey",
    "consultation",
    "insurance",
    "blog",
    "laboratory",
    "gallery",
    "end",
  ];

  return (
    <div className="relative w-full min-h-screen">
      {React.Children.map(children, (child, index) => {
        const sectionId = sections[index];
        return (
          <SectionTransition
            key={sectionId}
            sectionId={sectionId}
            isActive={currentSection === sectionId}
            className="w-full"
          >
            {child}
          </SectionTransition>
        );
      })}
    </div>
  );
};

interface NavigationButtonProps {
  sectionId: SectionType;
  label: string;
  isActive: boolean;
  onClick: (sectionId: SectionType) => void;
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  sectionId,
  label,
  isActive,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={() => onClick(sectionId)}
      className={`
        relative px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white/80 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }
        ${className}
      `}
    >
      {label}
    </button>
  );
};

interface SectionIndicatorProps {
  sections: { id: SectionType; label: string }[];
  currentSection: SectionType;
  onSectionChange: (sectionId: SectionType) => void;
  className?: string;
}

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  currentSection,
  onSectionChange,
  className = "",
}) => {
  return (
    <div
      className={`fixed top-1/2 right-8 transform -translate-y-1/2 z-50 ${className}`}
    >
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <div key={section.id} className="flex items-center gap-3">
            <div
              className={`
                w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                ${
                  currentSection === section.id
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-blue-400"
                }
              `}
              onClick={() => onSectionChange(section.id)}
            />
            <span
              className={`
                text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
                ${
                  currentSection === section.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-500"
                }
              `}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hook for managing section transitions
export const useSectionNavigation = (
  initialSection: SectionType = "header"
) => {
  const [currentSection, setCurrentSection] =
    useState<SectionType>(initialSection);

  const navigateToSection = (sectionId: SectionType) => {
    if (sectionId === currentSection) return;
    setCurrentSection(sectionId);
  };

  const nextSection = () => {
    const sections: SectionType[] = [
      "header",
      "dna-poster",
      "health-journey",
      "consultation",
      "insurance",
      "blog",
      "laboratory",
      "gallery",
      "end",
    ];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    navigateToSection(sections[nextIndex]);
  };

  const prevSection = () => {
    const sections: SectionType[] = [
      "header",
      "dna-poster",
      "health-journey",
      "consultation",
      "insurance",
      "blog",
      "laboratory",
      "gallery",
      "end",
    ];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex =
      currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    navigateToSection(sections[prevIndex]);
  };

  return {
    currentSection,
    navigateToSection,
    nextSection,
    prevSection,
  };
};
