import Testimonial from "./Testimonial";


export default function TestimonialsSection() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        <Testimonial
          name="John Doe"
          role="Hotel Manager"
          content="This platform made it super easy to manage my bookings and increase my occupancy rate!"
          avatar="https://randomuser.me/api/portraits/men/32.jpg"
        />
        <Testimonial
          name="Jane Smith"
          role="Traveler"
          content="Booking my stay was seamless and hassle-free. Highly recommended!"
          avatar="https://randomuser.me/api/portraits/women/44.jpg"
        />
        <Testimonial
          name="Ravi Kumar"
          role="Restaurant Owner"
          content="Managing food orders and customers has never been this simple!"
        />
      </div>
    </section>
  );
}
