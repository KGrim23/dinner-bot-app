import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "Dinner Bot App",
  description: "Generate recipes using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">
        <div className="flex flex-col items-center min-h-screen p-4">
          {" "}
          {/* Adjust padding here */}
          <header className="flex justify-center items-center mb-4">
            <Image
              src="/dinner_bot_logo.png"
              alt="Logo"
              width={300}
              height={300}
              className="mb-4"
            />
          </header>
          {/* Wrapper with flex and min-height */}
          <main className="flex-grow px-4">
            {" "}
            {/* Adjust horizontal padding here */}
            {/* Main content area */}
            {children}
          </main>
          <footer className="text-black text-center p-4">
            {" "}
            {/* Footer padding can remain as is or adjust */}
            {/* Footer styles */}
            <p>© {new Date().getFullYear()} Dinner Bot. All rights reserved.</p>
            <p>
              <a href="/privacy" className="text-gray-600 hover:text-gray-200">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/terms" className="text-gray-600 hover:text-gray-200">
                Terms of Service
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
