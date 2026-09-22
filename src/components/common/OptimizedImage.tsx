import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted/40", containerClassName)}>
      {/* Skeleton placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/50 via-muted to-muted/50" />
      )}

      {/* Fallback state on image error */}
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center bg-muted/60 text-muted-foreground p-4">
          <ImageIcon className="h-8 w-8 opacity-40" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt || "Image"}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (fallbackSrc && src !== fallbackSrc) {
              // try fallback if provided
            } else {
              setHasError(true);
            }
          }}
          className={cn(
            "transition-all duration-500",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}
