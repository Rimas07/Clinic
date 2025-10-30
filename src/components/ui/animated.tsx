import React, { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | "fadeInUp"
    | "fadeInLeft"
    | "fadeInRight"
    | "fadeInScale"
    | "slideInBottom"
    | "slideInTop";
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger animation when element is 50px from viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const animationClasses = {
    fadeInUp: "animate-fade-in-up",
    fadeInLeft: "animate-fade-in-left",
    fadeInRight: "animate-fade-in-right",
    fadeInScale: "animate-fade-in-scale",
    slideInBottom: "animate-slide-in-bottom",
    slideInTop: "animate-slide-in-top",
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${
        isVisible ? animationClasses[animation] : "opacity-0 translate-y-8"
      }`}
      style={{
        animationDuration: `${duration}s`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeInScale";
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className = "",
  staggerDelay = 0.1,
  animation = "fadeInUp",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationClasses = {
    fadeInUp: "animate-fade-in-up",
    fadeInLeft: "animate-fade-in-left",
    fadeInRight: "animate-fade-in-right",
    fadeInScale: "animate-fade-in-scale",
  };

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`${isVisible ? animationClasses[animation] : "opacity-0"}`}
          style={{
            animationDelay: `${index * staggerDelay}s`,
            animationDuration: "0.8s",
            animationFillMode: "forwards",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = "",
  intensity = "medium",
}) => {
  const intensityClasses = {
    low: "animate-float",
    medium: "animate-pulse-slow",
    high: "animate-float",
  };

  return (
    <div className={`${className} ${intensityClasses[intensity]}`}>
      {children}
    </div>
  );
};

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className = "",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
}) => {
  const gradientStyle = {
    background: `linear-gradient(45deg, ${colors.join(", ")})`,
    backgroundSize: "200% 200%",
  };

  return (
    <div
      className={`${className} animate-gradient-shift`}
      style={gradientStyle}
    >
      {children}
    </div>
  );
};
