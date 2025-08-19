type AvailableCityProps = {
  cities: string[]
}

export default function AvailableCity({ cities }: AvailableCityProps) {
  return (
    <div className="w-full flex flex-col items-center py-10">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        We are currently available in{" "}
        <span className="text-blue-600">{cities.length}</span> cities
      </h2>

      {/* Grid of cities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl">
        {cities.map((city, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-center text-gray-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition"
          >
            {city}
          </div>
        ))}
      </div>
    </div>
  )
}
