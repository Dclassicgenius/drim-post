import { cn } from "@/lib/utils";
import { Dancing_Script, Elsie_Swash_Caps } from "next/font/google";
import { Boxes } from "../ui/background-boxes";

const elsie = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const Hero = () => {
  return (
    <section className="h-[calc(75vh-5rem)] w-full bg-black">
      <div className="h-full bg-black relative w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute bg-black inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <h1
          className={cn(
            "text-3xl md:text-5xl lg:text-7xl font-black text-white relative z-20",
            elsie.className
          )}
        >
          Hello, I&apos;m Patrick.
        </h1>
        <p
          className={cn(
            "text-center text-balance md:text-xl font-medium mt-2 px-5 text-neutral-300 relative z-20",
            dancingScript.className
          )}
        >
          This is DrimBlog - My Journey in Bytes, Bits, and Big Ideas.
        </p>
      </div>
    </section>
  );
};

export default Hero;
