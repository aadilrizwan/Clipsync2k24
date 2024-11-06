import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "sonner";

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
        <body className={`${manrope.className} bg-white dark:bg-black`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
            </ReduxProvider>
            
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
