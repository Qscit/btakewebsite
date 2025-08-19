import TestimonialsSection from "./TestimonialsSection";

export default function About() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[300px] md:h-screen">
        <img
          src="https://picsum.photos/id/1018/1920/1080"
          alt="About Btake Hotel And Accommodation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
          About Btake Hotel And Accommodation
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Btake Hotel and Accommodation has a story built on hustle and growth.
          What started in 2022 as a small roadside stall has grown into a trusted
          space for travelers looking for comfort and affordability. Today, Btake
          offers both hostel and hotel accommodation, giving guests a choice between
          budget-friendly shared stays and private rooms with modern essentials.
          Whether you’re passing through, studying nearby, or staying longer, Btake
          combines convenience, comfort, and a welcoming atmosphere rooted in its
          humble beginnings.
        </p>
        <div>
            <TestimonialsSection/>
        </div>
      </div>
    </section>
  );
}
