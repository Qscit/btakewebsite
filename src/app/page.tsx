import Caraosel from "@/component/Caraosel";
import About from "@/component/About";
import OurService from "@/component/OurService";
import AvailableCity from "@/component/AvailableCity";

export const metadata = {
  title: "BTake - Home",
};

export default function Home() {
  return (
    <div className="font-sans overflow-x-hidden">
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