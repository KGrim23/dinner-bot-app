import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import Menu from "./components/Menu";

export const metadata = {
  title: "Dinner Bot App",
  description: "Generate recipes using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full bg-white text-black text-md">
        <div className="flex flex-col min-h-screen">
          <header className="flex justify-center items-center mb-4">
            <Link href="/">
              <Image
                src="/dinner_bot_2.png"
                priority
                alt="Logo"
                width={150}
                height={150}
                className="mb-4 mt-4"
              />
            </Link>
          </header>

          {/* Main content area with padding to avoid being covered by the footer */}
          <main className="flex-grow mb-64 text-sm md:text-md w-full max-w-xl mx-auto p-4">
            {children}
          </main>

          {/* Footer containing the Menu component */}
          <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md h-16">
            <Menu />
          </footer>
        </div>
      </body>
    </html>
  );
}
