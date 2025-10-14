import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with hover effect */}
        <div className="transform transition-transform duration-300 hover:scale-105">
          <img
            src={"/BTAKELOGO.jpg"}
            alt="logo"
            height={50}
            width={100}
            className="rounded-md"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-1 text-gray-700 font-medium">
          {[
            { href: "/", label: "Home" },
            { href: "/AboutUs", label: "About us" },
            { href: "/Services", label: "Services" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Button with gradient */}
        <div className="hidden md:block">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
           <Link  href="/ContactUs">
            Contact Now
           
           </Link>
          </button>
        </div>

        {/* Mobile Menu Button with animation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
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
                  className="animate-[spin_0.3s_ease-in-out]"
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

      {/* Mobile Menu with slide animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-b from-white to-gray-50 px-6 py-4 shadow-lg border-t border-gray-100">
          <ul className="flex flex-col space-y-2 text-gray-700 font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/AboutUs", label: "About us" },
              { href: "/Services", label: "Services" },
            ].map((item, index) => (
              <li
                key={item.href}
                className="transform transition-all duration-300"
                style={{
                  animation: isOpen
                    ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:pl-6 transition-all duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              className="pt-2"
              style={{
                animation: isOpen ? "slideIn 0.3s ease-out 0.3s both" : "none",
              }}
            >
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 w-full font-medium shadow-md hover:shadow-lg">
                Contact Now
              </button>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}