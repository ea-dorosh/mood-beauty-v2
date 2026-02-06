"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

interface GalleryImage {
  readonly src: string;
  readonly alt?: string;
}

interface MosaicGalleryProps {
  readonly images?: readonly GalleryImage[];
  readonly title?: string;
}

const MOSAIC_PATTERNS = [
  { gridColumn: `span 1`, gridRow: `span 2` }, // Tall
  { gridColumn: `span 1`, gridRow: `span 1` }, // Square
  { gridColumn: `span 1`, gridRow: `span 1` }, // Square
  { gridColumn: `span 1`, gridRow: `span 2` }, // Tall
  { gridColumn: `span 1`, gridRow: `span 1` }, // Square
  { gridColumn: `span 1`, gridRow: `span 1` }, // Square
];

const getMosaicStyle = (index: number) => {
  const patternIndex = index % MOSAIC_PATTERNS.length;
  return MOSAIC_PATTERNS[patternIndex];
};

export default function MosaicGallery({
  images = [],
  title = `Unsere Arbeiten`,
}: MosaicGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === `ArrowLeft`) {
        goToPrevious();
      } else if (event.key === `ArrowRight`) {
        goToNext();
      }
    };

    window.addEventListener(`keydown`, handleKeyDown);
    return () => window.removeEventListener(`keydown`, handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 mb-8">
      {title && (
        <h4 className="heading-4 mb-6 text-[1.3rem] font-semibold text-center">
          {title}
        </h4>
      )}

      {/* Mosaic Grid */}
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:gap-4"
        style={{
          gridAutoRows: `clamp(140px, 20vw, 200px)`,
        }}
      >
        {images.map((image, index) => {
          const mosaicStyle = getMosaicStyle(index);

          return (
            <div
              key={image.src}
              role="button"
              tabIndex={0}
              aria-label={image.alt || `Gallery image ${index + 1}`}
              onClick={() => openLightbox(index)}
              onKeyDown={(event) => {
                if (event.key === `Enter` || event.key === ` `) {
                  event.preventDefault();
                  openLightbox(index);
                }
              }}
              className="relative overflow-hidden rounded-xl cursor-pointer transition-[transform,box-shadow] duration-300 outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] group"
              style={mosaicStyle}
            >
              <Image
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 33vw"
                style={{
                  objectFit: `cover`,
                  transition: `transform 0.4s ease`,
                }}
                className="group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox — Radix Dialog */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/95" />
          <Dialog.Content
            className="fixed inset-0 z-[9999] flex items-center justify-center outline-none"
            onClick={closeLightbox}
          >
            <VisuallyHidden.Root>
              <Dialog.Title>Gallery Lightbox</Dialog.Title>
            </VisuallyHidden.Root>

            {/* Close button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-[60px] right-4 md:right-6 z-10 p-2 text-white bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </Dialog.Close>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 text-white bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Vorheriges Bild"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 text-white bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Nächstes Bild"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <span className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-widest">
              {currentIndex + 1} / {images.length}
            </span>

            {/* Main image */}
            <div
              className="relative w-[90vw] md:w-[80vw] h-[70vh] md:h-[80vh] max-w-[1200px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]?.src}
                alt={images[currentIndex]?.alt || `Gallery image`}
                fill
                sizes="100vw"
                style={{ objectFit: `contain` }}
                priority
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
