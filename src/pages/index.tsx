import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import Caraosel from "@/component/Caraosel";
import About from "@/component/About";
import OurService from "@/component/OurService";
import AvailableCity from "@/component/AvailableCity";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function Home() {
  return (
    <div
      className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen p-0 overflow-x-hidden"
    >
        <Caraosel />
        <About />
        <OurService/>
        <AvailableCity
          cities={[
            "Delhi",
            "Mumbai",
            "Bangalore",
            "Hyderabad",
            "Kolkata",
            "Chennai",
          ]}
        />
    </div>
  );
}
