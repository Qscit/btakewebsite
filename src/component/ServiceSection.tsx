"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Bed, Truck, Package, Wifi, Droplets, WashingMachine } from "lucide-react"

export default function ServiceSection() {
 const services = [
  {
    title: "Fooding",
    description: "Order fresh, hygienic meals and snacks delivered right to your room or hostel.",
    icon: <Utensils className="w-10 h-10 text-primary" />,
  },
  {
    title: "Lodging",
    description: "Comfortable and affordable hostel, hotel, or PG stays with flexible booking.",
    icon: <Bed className="w-10 h-10 text-primary" />,
  },
  {
    title: "WiFi Connectivity",
    description: "Stay connected with high-speed internet across all hostels and rooms.",
    icon: <Wifi className="w-10 h-10 text-primary" />,
  },
  {
    title: "Water Purifiers",
    description: "Access to clean and purified drinking water 24/7 in every stay.",
    icon: <Droplets className="w-10 h-10 text-primary" />,
  },
  {
    title: "Laundry & Washing Machines",
    description: "Hassle-free laundry facilities with washing machines provided in hostels.",
    icon: <WashingMachine className="w-10 h-10 text-primary" />,
  },
  {
    title: "Custom Packages",
    description: "Tailored food and stay packages designed for students, groups, and individuals.",
    icon: <Package className="w-10 h-10 text-primary" />,
  },
];
  return (
    <section className="py-16 px-6 bg-background text-foreground mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
              <CardHeader className="flex flex-col items-center">
                {service.icon}
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300 text-sm text-center">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
