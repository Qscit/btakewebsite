import Head from "next/head";
import Caraosel from "@/component/Caraosel";
import About from "@/component/About";
import OurService from "@/component/OurService";
import AvailableCity from "@/component/AvailableCity";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen p-0 overflow-x-hidden">
      {/* Meta Info */}
      <Head>
        <title>BTake - Home | Hotel & Food Booking</title>
        <meta name="description" content="BTake provides hotel and food booking services across multiple cities. Explore available hotels, food packages, and services." />
        <meta name="keywords" content="hotel booking, food delivery, Kolkata, BTake, travel" />
        <meta name="author" content="BTake" />


        {/* Open Graph / Social */}
        <meta property="og:title" content="My Website Home" />
        <meta property="og:description" content="Welcome to our website. Discover our services and available cities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mywebsite.com" />
        <meta property="og:image" content="https://www.mywebsite.com/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Website Home" />
        <meta name="twitter:description" content="Welcome to our website. Discover our services and available cities." />
        <meta name="twitter:image" content="https://www.mywebsite.com/og-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>

      {/* Page Content */}
      <Caraosel />
      <About />
      <OurService />
      <AvailableCity
        cities={[
          "Kolkata Dum Dum",
        ]}
      />
    </div>
  );
}
