import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <img src={"/BTAKELOGO.jpg"} alt="logo" height={50} width={100} />

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link href="/AboutUs" className="hover:text-blue-600">About us</Link>
          </li>
          <li>
            <Link href="/Services" className="hover:text-blue-600">Services</Link>
          </li>
        </ul>

        {/* Contact Button */}
        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Contact Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-md">
          <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link href="/AboutUs" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About us</Link>
            </li>
            <li>
              <Link href="/Services" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Services</Link>
            </li>
            <li>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                Contact Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
