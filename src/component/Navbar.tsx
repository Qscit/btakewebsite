import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        {/* <h1 className="text-2xl font-bold text-blue-600">Btake Stay</h1> */}
         <img src={"/BTAKELOGO.jpg"} alt="logo" height={50} width={200}/>
        {/* Nav Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link href="/hotels" className="hover:text-blue-600">Hotels</Link>
          </li>
          <li>
            <Link href="/food" className="hover:text-blue-600">Food</Link>
          </li>
          {/* <li>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </li> */}
        </ul>

        {/* Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Contact Now
        </button>
      </div>
    </nav>
  );
}
