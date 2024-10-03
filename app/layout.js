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
        <link rel="manifest" href="/manifest.json" /> {/* Link to manifest */}
        <meta name="theme-color" content="#317EFB" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full bg-white text-black text-md">
        <div className="flex flex-col items-center min-h-screen p-4">
          {" "}
          {/* Adjust padding here */}
          <header className="flex justify-center items-center mb-4">
            <Link href="/">
              <Image
                src="/dinner_bot_2.png"
                priority
                alt="Logo"
                width={150}
                height={150}
                className="mb-4"
              />
            </Link>
          </header>
          {/* Wrapper with flex and min-height */}
          <main className="flex-grow text-sm md:text-md w-full max-w-xl mx-auto p-2">
            {children}
            <Menu />
          </main>
          <footer className="text-black text-center p-4">
            {/* Footer styles */}
            {/* <p>© {new Date().getFullYear()} Dinner Bot. All rights reserved.</p>
            <p>
              <Link href="/" className="text-grey-600">
                Home
              </Link>{" "}
              |{" "}
              <Link href="/privacy" className="text-gray-600">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/terms" className="text-gray-600">
                Terms of Service
              </Link>
            </p> */}
          </footer>
        </div>
      </body>
    </html>
  );
}
