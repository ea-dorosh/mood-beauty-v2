"use client";

import { useEffect, useRef } from "react";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

interface ParallaxHeroProps {
  readonly src: string;
  readonly alt: string;
  readonly headline?: string;
  readonly subHeadline?: string;
  readonly height?: string;
  readonly children?: React.ReactNode;
}

export default function ParallaxHero({
  src,
  alt,
  headline,
  subHeadline,
  height = `80vh`,
  children,
}: ParallaxHeroProps) {
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY || 0;
      const imageTranslate = Math.min(scrollY * 0.2, 120);
      const contentTranslate = Math.min(scrollY * 0.1, 60);

      if (imageLayerRef.current) {
        imageLayerRef.current.style.transform = `translate3d(0, ${imageTranslate}px, 0) scale(1.05)`;
      }
      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(0, ${contentTranslate}px, 0)`;
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener(`scroll`, onScroll, { passive: true });
    window.addEventListener(`resize`, onScroll);

    return () => {
      window.removeEventListener(`scroll`, onScroll);
      window.removeEventListener(`resize`, onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      {/* Image layer */}
      <div
        ref={imageLayerRef}
        className="absolute inset-0"
        style={{
          willChange: `transform`,
          transform: `translate3d(0, 0, 0) scale(1.05)`,
          backfaceVisibility: `hidden`,
          transformStyle: `preserve-3d`,
          contain: `paint`,
        }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          priority
          fill
          sizes="100vw"
          quality={90}
          placeholder="empty"
          style={{
            transformOrigin: `center`,
            objectFit: `cover`,
            objectPosition: `center`,
            willChange: `transform`,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.35) 100%)`,
        }}
      />

      {/* Content layer */}
      <div
        ref={contentLayerRef}
        className="relative z-[1] h-full"
      >
        {children ? (
          children
        ) : (
          <div className="h-full flex items-center justify-center text-center px-4 md:px-12">
            <div className="max-w-[980px]">
              {headline && (
                <h1 className="text-white uppercase tracking-wider md:tracking-widest text-[2rem] md:text-[3rem] font-bold">
                  {headline}
                </h1>
              )}

              {subHeadline && (
                <p className="text-gray-100 mt-4 text-base md:text-xl leading-relaxed">
                  {subHeadline}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
