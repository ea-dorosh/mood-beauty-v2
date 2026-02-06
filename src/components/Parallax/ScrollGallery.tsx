"use client";

import { useRef, useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

interface ScrollGalleryImage {
  readonly src: string;
  readonly alt?: string;
}

interface ScrollGalleryProps {
  readonly images?: readonly ScrollGalleryImage[];
}

export default function ScrollGallery({ images = [] }: ScrollGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const windowH = window.innerHeight;
        const start = Math.max(0, windowH - rect.top);
        const end = rect.height + windowH;
        const p = Math.min(1, Math.max(0, start / end));

        // Apply transforms directly to reduce React re-renders
        itemRefs.current.forEach((el, index) => {
          if (!el) return;
          const base = 1 + index * 0.04;
          // Reduced travel so images start closer to the top of the block
          const translateY = (1 - p) * (20 - index * 6);
          el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${base})`;
        });
      });
    };

    onScroll();
    window.addEventListener(`scroll`, onScroll, { passive: true });
    window.addEventListener(`resize`, onScroll);

    return () => {
      window.removeEventListener(`scroll`, onScroll);
      window.removeEventListener(`resize`, onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Layout config for each card
  const cardConfigs = [
    { widthPct: `52%`, leftPct: `6%`, topPct: `2%` },
    { widthPct: `38%`, leftPct: `48%`, topPct: `12%` },
    { widthPct: `27%`, leftPct: `72%`, topPct: `28%` },
  ];

  return (
    <section ref={containerRef}>
      <div
        className="relative h-[347px] md:h-[560px] overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          willChange: `transform`,
          transform: `translateZ(0)`,
          backfaceVisibility: `hidden`,
        }}
      >
        {images.slice(0, 3).map((img, index) => {
          const base = 1 + index * 0.04;
          const z = 10 - index;
          const config = cardConfigs[index];

          return (
            <div
              key={img.src}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="absolute overflow-hidden rounded-xl md:rounded-2xl"
              style={{
                top: config.topPct,
                left: config.leftPct,
                width: config.widthPct,
                aspectRatio: `3 / 4`,
                transform: `translate3d(0, 0, 0) scale(${base})`,
                zIndex: z,
                boxShadow: `0 10px 20px rgba(0,0,0,.18)`,
                willChange: `transform, opacity`,
                backfaceVisibility: `hidden`,
                transformStyle: `preserve-3d`,
                contain: `paint`,
              }}
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt || ``}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={90}
                style={{
                  objectFit: `cover`,
                  objectPosition: `center`,
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
