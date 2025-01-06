import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  caption?: string;
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  caption,
}: ImageProps) {
  return (
    <figure className="my-8">
      <div className={cn("overflow-hidden rounded-lg", className)}>
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
