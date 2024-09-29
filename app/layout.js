import "./globals.css";

export const metadata = {
  title: "Dinner Bot App",
  description: "Generate recipes using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">
        <div className="flex flex-col min-h-screen">
          {" "}
          {/* Wrapper with flex and min-height */}
          <main className="flex-grow">
            {" "}
            {/* Main content area */}
            {children}
          </main>
          <footer className=" text-black text-center p-4">
            {" "}
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
