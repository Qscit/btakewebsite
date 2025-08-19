import Navbar from "./Navbar"
import Footer from "./Footer"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
