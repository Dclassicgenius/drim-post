import { cn } from "@/lib/utils";
import { Dancing_Script, Elsie_Swash_Caps, Lora } from "next/font/google";
import { Boxes } from "../ui/background-boxes";
import { Vortex } from "../ui/vortex";

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

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const Hero = () => {
  return (
    <section className="h-[calc(75vh-5rem)] w-full bg-black">
      <div className="h-[45%] bg-black relative w-full overflow-hidden flex flex-col items-center justify-center">
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

        {/* <button
          className={cn(
            "inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 z-20 mt-5 text-xl",
            elsie.className
          )}
        >
          View all posts
        </button> */}
      </div>
      <div className="w-full h-[55%] mx-auto rounded-md  overflow-hidden">
        <Vortex className="flex items-start flex-col justify-start px-2 md:px-10 py-4 w-full h-full">
          <h2
            className={cn(
              elsie.className,
              "text-white text-4xl md:text-6xl lg:text-8xl font-black mt-10 px-4 uppercase antialiased"
            )}
          >
            Drim.
          </h2>
          <p
            className={cn(
              "text-white text-sm md:text-2xl max-w-xl px-4",
              lora.className
            )}
          >
            Dream It. Build It. Live It.
          </p>
        </Vortex>
      </div>
    </section>
  );
};

export default Hero;
