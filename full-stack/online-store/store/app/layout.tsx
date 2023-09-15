import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import ModalProvider from "@/providers/modal";
import ToastProvider from "@/providers/toast";

const font = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
