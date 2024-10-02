"use client";

import React, { useEffect, useState } from "react";
import FavoritedRecipes from "../components/FavoritedRecipes";

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from local storage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    console.log("Stored Recipes:", storedRecipes);
    setRecipes(storedRecipes);
  }, []);

  return (
    <div className="mt-6 mb-6 w-full sm:max-w-md md:max-w-lg mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4 mt-8">
        Your Favorite Recipes:
      </h2>

      <div className="flex flex-col justify-center md:justify-start gap-8 mb-2">
        {recipes.length > 0 ? (
          // Wrap FavoritedRecipes component in a div to ensure gap is applied between each recipe
          <div className="flex flex-col gap-6">
            <FavoritedRecipes recipes={recipes} className="w-full" />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No favorite recipes found.
          </p>
        )}
      </div>
    </div>
  );
}
