import ServiceCard from "./Cards";

export default function OurService() {
  return (
    <section className="w-full px-6 py-12 text-center">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        We Provide
      </h2>

      {/* Cards Wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
       <ServiceCard
        title="Hostel"
        description="Browse our list of hostels easily."
        content="Find affordable hostels near you and book instantly."
        primaryAction="Download App"
        secondaryAction="Learn More"
      />

      <ServiceCard
        title="Food"
        description="Browse our list of hostels easily."
        content="Find affordable hostels near you and book instantly."
        primaryAction="Download App"
        secondaryAction="Learn More"
      />
      <ServiceCard
        title="Office Food Delivery"
        description="We’re launching our application soon! With it, you can easily order monthly meal plans for your office—no more worrying every day about what to eat."
        content="Our menu includes complete lunch options with both vegetarian and non-vegetarian choices."
        primaryAction="Download App"
        secondaryAction="Learn More"
      />

      </div>
    </section>
  );
}
