import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import SiteFrame from "./components/SiteFrame";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-heading",
  weight: ["700", "800", "900"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "قَطرَة | دليل التقطير اليدوي",
  description: "وصفات دقيقة للقهوة المقطرة — V60، كيميكس، وكاليتا ويف — بأوزان وحرارة وتوقيت مضبوط لكل صبة، لكوب متوازن في كل مرة.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "قَطرَة - دليل التقطير اليدوي",
    description: "وصفات دقيقة للقهوة المقطرة بأوزان وحرارة وتوقيت مضبوط لكل صبة.",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${tajawal.variable} ${plexArabic.variable} font-sans antialiased bg-[var(--background)]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SiteFrame>{children}</SiteFrame>
            <Toaster
              position="top-center" 
              richColors 
              closeButton 
              className="font-sans"
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
