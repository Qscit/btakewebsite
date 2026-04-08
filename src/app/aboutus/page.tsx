import Roadmap from "@/component/Roadmap";
import TestimonialsSection from "@/component/TestimonialsSection";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">
        About Us
      </h2>

      {/* Testimonials Section */}
      <div className="mb-12">
        <TestimonialsSection />
        <Roadmap/>
      </div>

      {/* Content Section */}
      <div className="space-y-6 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
          Welcome to <span className="font-semibold">Btake</span>! 
          We are dedicated to providing affordable accommodations 
          and delicious food delivery right at your doorstep.
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Our mission is to make staying and dining easier than ever —
          whether you’re looking for a comfortable hostel, booking a hotel room, 
          or ordering office lunch packages, we’ve got you covered.
        </p>
      </div>
    </div>
  );
}
