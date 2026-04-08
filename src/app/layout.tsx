import "../styles/globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { ReduxProvider } from "@/store/provider";

export const metadata = {
  title: "BTake",
  description: "BTake Hotel & Food Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
         <ReduxProvider>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        </ReduxProvider>

      </body>
    </html>
  );
}