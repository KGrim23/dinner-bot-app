"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import RecipeCard from "./RecipeCard";

export default function AllRecipes({ extractedRecipes = [], error }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load stored favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Store recipes in localStorage
  useEffect(() => {
    if (extractedRecipes.length) {
      localStorage.setItem("recipes", JSON.stringify(extractedRecipes));
    }
  }, [extractedRecipes]);

  const toggleFavorite = (index) => {
    const updatedFavorites = [...favorites];

    // Toggle the favorite status of the recipe at the given index
    if (updatedFavorites.includes(index)) {
      updatedFavorites.splice(updatedFavorites.indexOf(index), 1); // Remove from favorites if it's already there
    } else {
      updatedFavorites.push(index); // Add to favorites
    }

    setFavorites(updatedFavorites);

    // Update localStorage with the new favorites array
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Handle recipe click to show RecipeCard
  const handleRecipeClick = (index) => {
    setCurrentIndex(index);
  };

  // Filter out any recipes that do not have a valid title or description
  const validRecipes = extractedRecipes.filter(
    (recipe) => recipe.title && recipe.description
  );

  return (
    <div className="mt-6 mb-6 w-full sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
      {error && <p className="text-red-500">{error}</p>}

      {currentIndex !== null ? (
        <RecipeCard
          recipe={validRecipes[currentIndex]}
          onClose={() => setCurrentIndex(null)}
          onNext={() =>
            setCurrentIndex((prev) =>
              Math.min(prev + 1, validRecipes.length - 1)
            )
          }
          onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        />
      ) : (
        Array.isArray(validRecipes) &&
        validRecipes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl text-center font-semibold mb-4 mt-8">
              Recipe Suggestions:
            </h2>

            {validRecipes.map((recipe, index) => (
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
                    isFavorited={favorites.includes(index)}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
                  <Image
                    src={recipe.image || "/recipe_placeholder.webp"}
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
