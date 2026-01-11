export const metadata = {
  title: "Emeka Okonkwo | E-commerce & Digital Marketing Strategist",
  description:
    "E-commerce and digital marketing strategist helping FMCG and retail brands drive online revenue growth through data-driven strategy, conversion optimization, and performance marketing.",
};

import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-STWQJE68VN"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-STWQJE68VN', { page_path: window.location.pathname });
          `}
        </Script>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
