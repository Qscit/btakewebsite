export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 w-full">
      <div className="px-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full">
        {/* Left Side - Brand */}
        <div className="text-lg font-bold text-white">
          BtakeStay
        </div>

        {/* Center - Links */}
        <div className="flex space-x-6 my-4 md:my-0">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
        </div>

        {/* Right Side - Copy */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} BtakeStay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
