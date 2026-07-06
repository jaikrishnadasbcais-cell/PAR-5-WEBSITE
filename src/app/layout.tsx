import type { Metadata } from "next";
import localFont from "next/font/local";
import { BuildMySystemProvider, FloatingPanel } from "@/components/features/build-my-system";
import "../styles/globals.css";

const fraunces = localFont({
  src: [
    { path: "../../public/fonts/Fraunces-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../../public/fonts/Fraunces-Italic-Variable.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-fraunces-raw",
  display: "swap",
});

const inter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  variable: "--font-inter-raw",
  display: "swap",
  weight: "400 700",
});

const ibmPlexMono = localFont({
  src: [
    { path: "../../public/fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAR5 — Technology & Growth Partner",
  description:
    "PAR5 is the technology and growth partner businesses hand their website, CRM, automation, and growth work to — under one roof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BuildMySystemProvider>
          {children}
          <FloatingPanel />
        </BuildMySystemProvider>
      </body>
    </html>
  );
}
