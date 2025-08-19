// src/components/Roadmap.tsx
"use client";

export default function Roadmap() {
  const roadmap = [
    {
      step: "Step 1",
      title: "Idea & Planning",
      description:
        "We started Btake with the vision to simplify food delivery and affordable accommodations.",
    },
    {
      step: "Step 2",
      title: "Development",
      description:
        "Our team worked hard to design, develop, and test the platform for reliability.",
    },
    {
      step: "Step 3",
      title: "Launch",
      description:
        "Btake went live with hotel bookings and food delivery to serve our first customers.",
    },
    {
      step: "Step 4",
      title: "Expansion",
      description:
        "We’re expanding to more cities and adding new features to improve customer experience.",
    },
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Our Roadmap
      </h2>

      <div className="relative border-l-2 border-gray-300 dark:border-gray-600">
        {roadmap.map((item, index) => (
          <div key={index} className="mb-12 ml-6">
            {/* Circle */}
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900"></div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.step}: {item.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
