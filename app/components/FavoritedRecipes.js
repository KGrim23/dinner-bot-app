"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function FavoritedRecipes({ recipes, onRecipeClick }) {
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritedRecipesData = recipes.filter(
      (_, index) => storedFavorites[index]
    );
    setFavoritedRecipes(favoritedRecipesData);
  }, [recipes]);

  return (
    <div>
      {favoritedRecipes.length > 0 ? (
        favoritedRecipes.map((recipe, index) => (
          <div
            key={index}
            className="flex flex-col mb-4 cursor-pointer p-2 border border-gray-300 bg-slate-200 rounded-lg shadow-md hover:bg-slate-300 transition-all"
            onClick={() => onRecipeClick(index)} // Handle recipe click
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-black">
                {recipe.title}
              </h3>
            </div>
            <Image
              src={recipe.image || "/recipe_placeholder.webp"}
              alt={recipe.title}
              width={150}
              height={150}
              className="rounded-lg object-cover w-full md:w-40"
            />
            <p className="text-sm text-green-900 mt-2 mb-2 italic">
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
        ))
      ) : (
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
}
