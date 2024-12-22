import type { Metadata } from "next";
import { PT_Sans, PT_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/SiteHeaders/SiteHeader";

const fontSans = PT_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-pt-sans",
});

const fontMono = PT_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: "400",
  variable: "--font-pt-mono",
});

export const metadata: Metadata = {
  title: "DrimBlog",
  description: "This is DrimBlog - My Journey in Bytes, Bits, and Big Ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth scroll-pt-[5rem]"
    >
      <body
        className={cn(
          "bg-background min-h-screen font-pt-sans font-pt-mono antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            {/* <SiteFooter /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
