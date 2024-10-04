"use client";

import React from "react";
import Link from "next/link"; // Import Link for navigation
import {
  HomeIcon,
  HeartIcon,
  Cog6ToothIcon,
  FolderIcon, // Importing FolderIcon for Collection
} from "@heroicons/react/24/outline"; // Use outline icons

export default function Menu() {
  return (
    <div className="flex flex-row md:text-md w-full justify-between items-center max-w-xl mx-auto p-4">
      {/* Home Button */}
      <Link
        href="/"
        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-all"
      >
        <HomeIcon className="h-6 w-6 text-black" />
        <span className="text-xs mt-1 text-black">Home</span>
      </Link>

      {/* Favorite Button */}
      <Link
        href="/favorites"
        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-all"
      >
        <HeartIcon className="h-6 w-6 text-black" />
        <span className="text-xs mt-1 text-black">Favorite</span>
      </Link>

      {/* Collection Button */}
      <Link
        href="/collection" // Adjust the href as necessary
        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-all"
      >
        <FolderIcon className="h-6 w-6 text-black" />{" "}
        {/* Use FolderIcon for collection */}
        <span className="text-xs mt-1 text-black">Collection</span>
      </Link>

      {/* Settings Button */}
      <Link
        href="/settings"
        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-all"
      >
        <Cog6ToothIcon className="h-6 w-6 text-black" />
        <span className="text-xs mt-1 text-black">Settings</span>
      </Link>
    </div>
  );
}
