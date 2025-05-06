import type { Metadata } from "next";

import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/globals/containers";
import Navbar from "@/components/navbar/navbar";
// import { Separator } from "@/components/ui/separator";
const inter = Inter({
  subsets: ["latin"],
});

// Setting up metadata for SEO
export const metadata: Metadata = {
  title: "Apollo 247 - Find General Physicians & Internal Medicine Experts",
  description:
    "Find experienced General Physicians and Internal Medicine specialists at Apollo 247. Book your consultation now and get expert medical advice.",
  keywords:
    "general physician, internal medicine, doctor, consultation, Apollo 247",
  openGraph: {
    type: "website",
    url: "https://www.apollo247.com/specialties/general-physician-internal-medicine",
    title: "Apollo 247 - Find General Physicians & Internal Medicine Experts",
    description:
      "Find experienced General Physicians and Internal Medicine specialists at Apollo 247. Book your consultation now and get expert medical advice.",
    images: ["https://www.apollo247.com/path/to/doctor-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apollo 247 - Find General Physicians & Internal Medicine Experts",
    description:
      "Find experienced General Physicians and Internal Medicine specialists at Apollo 247. Book your consultation now and get expert medical advice.",
    images: ["https://www.apollo247.com/path/to/doctor-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <Container className="py-20">{children}</Container>
      </body>
    </html>
  );
}
