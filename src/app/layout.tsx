import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as ReactHotToaster } from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Trails & Memoirs | Kenyan Hiking Group and Outdoor Expeditions",
  description:
    "Join Trails & Memoirs for the ultimate outdoor group expeditions in Kenya. Book your next hike to Elephant Hill, Ragia Falls, and more. Register today!",
  keywords: [
    "hiking groups in Kenya",
    "Trails and Memoirs booking",
    "Trails and Memoirs ",
    "Elephant Hill hike",
    "Ragia Falls trekking",
    "Nairobi hiking community",
  ],
  alternates: {
    canonical: "https://trails-and-memoirs.vercel.app",
  },
  verification: {
    google: "3aWfJFMWrudoiQ0p1SqvR_tHMHALMyekb9-jMPHacWs",
  },
  openGraph: {
    title: "Trails & Memoirs | Kenyan Hiking Group",
    description:
      "Discover your next adventure. Join a community of Kenyan hikers exploring stunning trails together.",
    url: "https://trails-and-memoirs.vercel.app",
    siteName: "Trails & Memoirs",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "https://trails-and-memoirs.vercel.app/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Trails & Memoirs hiking expedition",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${poppins.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <ReactHotToaster />
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
