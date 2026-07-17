import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "At Olive Investment Services | Expert Financial Planning & Wealth Management",
  description:
    "Build wealth with confidence. Expert financial planning, wealth management, and investment solutions tailored to your unique goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}