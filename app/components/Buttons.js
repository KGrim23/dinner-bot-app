"use client";
import React from "react";

export default function Buttons({
  onPrevious,
  onNext,
  onClose,
  currentIndex,
  totalRecipes,
}) {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={onPrevious}
        className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition-all disabled:opacity-50"
        disabled={currentIndex === 0} // Disable if it's the first recipe
      >
        Previous
      </button>

      {/* Back to all recipes */}
      <button
        onClick={onClose}
        className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition-all"
      >
        All Recipes
      </button>

      <button
        onClick={onNext}
        className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition-all disabled:opacity-50"
        disabled={currentIndex === totalRecipes - 1} // Disable if it's the last recipe
      >
        Next
      </button>
    </div>
  );
}
