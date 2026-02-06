"use client";

import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

interface RevealSectionProps {
  readonly src: string;
  readonly alt: string;
  readonly title?: string;
  readonly text?: string;
  readonly imageSide?: "left" | "right";
  readonly height?: number;
}

export default function RevealSection({
  src,
  alt,
  title,
  text,
  imageSide = `right`,
  height = 560,
}: RevealSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const imageBlock = (
    <div
      className="relative flex-[1_1_55%] overflow-hidden rounded-none md:rounded-3xl mx-[calc(50%-50vw)] md:mx-0 w-screen md:w-auto"
      style={{
        minHeight: `clamp(280px, 50vw, ${height}px)`,
        transform: visible ? `none` : `translateY(24px)`,
        opacity: visible ? 1 : 0,
        transition: `opacity .6s ease, transform .6s ease`,
      }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        style={{
          objectFit: `cover`,
          objectPosition: `center`,
        }}
      />
    </div>
  );

  const copyBlock = (
    <div
      className="flex-[1_1_45%] px-4 md:px-8 mt-4 md:mt-0"
      style={{
        transform: visible ? `none` : `translateY(24px)`,
        opacity: visible ? 1 : 0,
        transition: `opacity .6s ease .1s, transform .6s ease .1s`,
      }}
    >
      {title && (
        <h3 className="heading-3 font-bold mb-4 tracking-tight">
          {title}
        </h3>
      )}
      {text && (
        <p className="body-text leading-[1.75]">
          {text}
        </p>
      )}
    </div>
  );

  return (
    <section ref={containerRef} className="my-8 md:my-16">
      <div
        className={`flex flex-col gap-4 md:gap-8 items-stretch ${
          imageSide === `right` ? `md:flex-row` : `md:flex-row-reverse`
        }`}
      >
        {imageBlock}
        {copyBlock}
      </div>
    </section>
  );
}
