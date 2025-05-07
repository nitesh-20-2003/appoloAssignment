import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/globals/containers";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // improves font loading performance
});

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title:
    "Top General Physicians & Internal Medicine Doctors | Apollo 247 Clone",
  description:
    "Find and book the best General Physicians and Internal Medicine specialists near you. Verified doctor profiles, patient reviews, and instant appointments.",
  keywords: [
    "general physician near me",
    "internal medicine specialist",
    "best doctors in [city]",
    "online doctor consultation",
    "Apollo 247 doctors",
    "medical specialists",
    "healthcare professionals",
    "doctor appointment booking",
  ],
  authors: [{ name: "Apollo 247 Clone Project" }],
  creator: "Internship Candidate",
  publisher: "Apollo 247 Clone",
  metadataBase: new URL("https://www.apollo247.com"),
  alternates: {
    canonical: "/specialties/general-physician-internal-medicine",
  },
  openGraph: {
    type: "website",
    url: "https://www.apollo247.com/specialties/general-physician-internal-medicine",
    title: "Find Top-Rated General Physicians | Apollo 247 Clone",
    description:
      "Book experienced General Physicians and Internal Medicine specialists with verified patient reviews and flexible appointment slots.",
    siteName: "Apollo 247 Clone",
    images: [
      {
        url: "https://www.apollo247.com/path/to/doctor-image.jpg",
        width: 1200,
        height: 630,
        alt: "General Physician Consultation",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Top-Rated General Physicians | Apollo 247 Clone",
    description:
      "Book experienced General Physicians and Internal Medicine specialists with verified patient reviews and flexible appointment slots.",
    images: ["https://www.apollo247.com/path/to/doctor-image.jpg"],
    site: "@Apollo247Clone",
    creator: "@InternCandidate",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add if available
    yandex: "your-yandex-verification-code", // Add if available
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", 
  category: "healthcare",
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
      itemScope
      itemType="http://schema.org/MedicalOrganization"
    >
      <head>
        {/* Structured data for better rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Apollo 247 Clone",
            url: "https://www.apollo247.com",
            logo: "https://www.apollo247.com/path/to/logo.png",
            description:
              "Online platform for booking doctor appointments with top General Physicians and Internal Medicine specialists.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Medical Street",
              addressLocality: "City",
              addressRegion: "State",
              postalCode: "123456",
              addressCountry: "India",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-234-567-8901",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/apollo247",
              "https://www.twitter.com/apollo247",
              "https://www.linkedin.com/company/apollo247",
            ],
          })}
        </script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <Container className="py-20">{children}</Container>
      </body>
    </html>
  );
}
