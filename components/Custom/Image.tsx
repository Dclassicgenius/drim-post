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
    <figure className="my-8 ">
      <div
        className={cn(" w-full", className)}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : "16 / 9",
        }}
      >
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full overflow-hidden rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
