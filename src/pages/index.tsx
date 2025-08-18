import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <Navbar/>
      <div className="flex-grow flex items-center justify-center bg-blue-500">
        <h1 className="text-5xl font-bold text-white">Tailwind is Working</h1>
      </div>
      <Footer/>
    </div>
  );
}
