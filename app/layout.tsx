import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import SiteHeader from "@/components/SiteHeaders/SiteHeader";
import Footer from "@/components/Footer/Footer";
import { siteConfig } from "@/config/site";

const fontSans = Overpass({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-overpass-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
          "bg-background min-h-screen font-overpass-sans font-overpass-mono antialiased",
          fontSans.className
          // fontMono.className
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
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
