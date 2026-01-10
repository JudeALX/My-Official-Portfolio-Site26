import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Emeka Okonkwo | E-commerce & Digital Marketing Strategist",
  description:
    "Strategic E-commerce Manager with 7+ years driving digital growth for multinational brands through data-driven marketing, UX optimization, and cross-border website management.",
  keywords: ["E-commerce Manager", "Digital Marketing", "Web Development", "SEO", "SEM", "Shopify", "WooCommerce"],
  authors: [{ name: "Emeka Jude Okonkwo" }],
  openGraph: {
    title: "Emeka Okonkwo | E-commerce & Digital Marketing Strategist",
    description: "Strategic E-commerce Manager with 7+ years driving digital growth for multinational brands.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
