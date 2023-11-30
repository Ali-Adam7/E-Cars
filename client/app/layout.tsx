`use server`;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ReduxProvider from "../store/reduxProvider";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Cars store",
  description: "The Largest Electrical Cars Ecommerse store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ReduxProvider>
          <Navbar />

          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
