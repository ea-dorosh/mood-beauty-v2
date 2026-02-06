"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// Tiny blurred placeholder (same as old project)
const DEFAULT_BLUR_DATA_URL =
  `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==`;

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  readonly objectPosition?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  style,
  className,
  fill = false,
  loading = `lazy`,
  quality = 75,
  placeholder = `blur`,
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  objectPosition,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (fill) {
    return (
      <>
        {/* Skeleton placeholder while loading */}
        {isLoading && !error && (
          <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
        )}

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          loading={priority ? `eager` : loading}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          style={{
            ...style,
            ...(objectPosition ? { objectPosition } : {}),
            ...(!isLoading ? {} : { opacity: 0.001 }),
            transition: `opacity 0.2s linear`,
          }}
          {...props}
        />

        {/* Error fallback */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
            Bild konnte nicht geladen werden
          </div>
        )}
      </>
    );
  }

  return (
    <div className={className} style={{ position: `relative`, ...style }}>
      {/* Skeleton placeholder while loading */}
      {isLoading && !error && (
        <div
          className="absolute top-0 left-0 bg-gray-200 animate-pulse"
          style={{ width: width as number, height: height as number }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width as number}
        height={height as number}
        priority={priority}
        sizes={sizes}
        loading={priority ? `eager` : loading}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        style={{
          ...(objectPosition ? { objectPosition } : {}),
          ...(!isLoading ? {} : { opacity: 0.001 }),
          transition: `opacity 0.2s linear`,
        }}
        {...props}
      />

      {/* Error fallback */}
      {error && (
        <div
          className="absolute top-0 left-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm"
          style={{ width: width as number, height: height as number }}
        >
          Bild konnte nicht geladen werden
        </div>
      )}
    </div>
  );
}
