import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {

  metadataBase: new URL("https://www.systechconsultancy.in"),

  title: {
    template: '%s | Systech Consultancy',
    default: "Systech Consultancy | Expert Guidance for Study in Germany",
  },

  description:
    "Get expert mentorship for your Master's in Germany. We provide end-to-end guidance on university selection, applications, and visa processes, led by a 20-year German industry veteran.",

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>

        <meta
          property="og:image"
          content="https://www.systechconsultancy.in/og-banner.png"
        />
        <meta property="og:url" content="https://www.systechconsultancy.in/" />
        <meta property="og:title" content="Systech Consultancy | Expert Guidance for Study in Germany" />
        <meta property="og:description" content="Get expert mentorship for your Master's in Germany. We provide end-to-end guidance on university selection, applications, and visa processes, led by a 20-year German industry veteran." />
        <meta
          property="og:image:alt"
          content="Systech Consultancy Banner"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
