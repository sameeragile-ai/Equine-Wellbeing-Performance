import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackGradient?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackText,
  fallbackGradient = 'from-[#1A3326] to-[#2E4A3B]',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const initial = fallbackText ? fallbackText.charAt(0).toUpperCase() : (alt.charAt(0) || 'E').toUpperCase();

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${fallbackGradient} text-white font-serif font-medium select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xl tracking-wider opacity-80">{initial}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
