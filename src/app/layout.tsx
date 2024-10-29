import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs';
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
const manrope = DM_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Clipsync",
  description:
    "ClipSync is a video messaging platform that lets users record their screen, webcam, and voice to create quick video messages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${manrope.className} bg-[#171717]`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>

  );
}
