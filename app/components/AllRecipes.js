"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import RecipeCard from "./RecipeCard";

export default function AllRecipes({ extractedRecipes = [], error }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load stored favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Store recipes in local storage
  useEffect(() => {
    if (extractedRecipes.length) {
      localStorage.setItem("recipes", JSON.stringify(extractedRecipes));
    }
  }, [extractedRecipes]);

  const toggleFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = !updatedFavorites[index]; // Toggle favorite state
    setFavorites(updatedFavorites);

    // Update local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Handle recipe click to show RecipeCard
  const handleRecipeClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mt-6 mb-6 w-full sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
      {error && <p className="text-red-500">{error}</p>}

      {currentIndex !== null ? (
        <RecipeCard
          recipe={extractedRecipes[currentIndex]}
          onClose={() => setCurrentIndex(null)}
          onNext={() =>
            setCurrentIndex((prev) =>
              Math.min(prev + 1, extractedRecipes.length - 1)
            )
          }
          onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        />
      ) : (
        Array.isArray(extractedRecipes) &&
        extractedRecipes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl text-center font-semibold mb-4 mt-8">
              Recipe Suggestions:
            </h2>

            {extractedRecipes.map((recipe, index) => (
              <div
                key={index}
                onClick={() => handleRecipeClick(index)}
                className="cursor-pointer p-4 border border-gray-300 bg-slate-200 rounded-lg shadow-md hover:bg-slate-300 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-black">
                    {recipe.title}
                  </h3>
                  <FavoriteButton
                    onClick={() => toggleFavorite(index)}
                    isFavorited={favorites[index] || false}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
                  <Image
                    src="/recipe_placeholder.webp"
                    alt="recipe image"
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-full md:w-40"
                  />
                  <div className="flex flex-col gap-2 w-full md:w-2/3">
                    <p className="text-sm text-green-900 italic">
                      {recipe.description}
                    </p>
                    <div className="flex space-x-4">
                      <span className="text-gray-500 text-xs font-small py-1 rounded-full">
                        ⏰ {recipe.time}
                      </span>
                      <span className="text-gray-500 text-xs font-small px-3 py-1 rounded-full">
                        🎯 {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
