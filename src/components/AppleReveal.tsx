"use client";

import React, { useEffect, useRef, useState } from "react";

interface AppleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none" | "scale";
  threshold?: number;
}

export function AppleReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
}: AppleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return "opacity-100 translate-y-0 scale-100 blur-0";
    if (direction === "up") return "opacity-0 translate-y-8 scale-[0.98] blur-[2px]";
    if (direction === "down") return "opacity-0 -translate-y-8 scale-[0.98] blur-[2px]";
    if (direction === "scale") return "opacity-0 scale-95 blur-[3px]";
    return "opacity-0 blur-[2px]";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "850ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}
