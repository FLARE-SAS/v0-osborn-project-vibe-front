import type React from "react"
import type { Metadata } from "next"
import { Mulish } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
})

export const metadata: Metadata = {
  title: "Osborn - Brand Foundations",
  description: "Configure your brand foundations with Osborn",
  generator: "Osborn",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
