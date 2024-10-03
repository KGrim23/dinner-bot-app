"use client";

import React, { useEffect, useState } from "react";
import FavoritedRecipes from "../components/FavoritedRecipes";
import RecipeCard from "../components/RecipeCard";
import Menu from "../components/Menu";

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(null);

  useEffect(() => {
    // Fetch recipes from local storage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    console.log("Stored Recipes:", storedRecipes);
    setRecipes(storedRecipes);
  }, []);

  // Handle recipe click to show detailed RecipeCard
  const handleRecipeClick = (index) => {
    setCurrentRecipeIndex(index);
  };

  // Handle closing the RecipeCard
  const handleCloseRecipe = () => {
    setCurrentRecipeIndex(null);
  };

  return (
    <div className="mt-6 mb-6 w-full sm:max-w-md md:max-w-lg mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4 mt-8">
        Your Favorite Recipes:
      </h2>

      <div className="flex flex-col justify-center md:justify-start gap-8 mb-2">
        {currentRecipeIndex === null ? (
          // Show the list of favorited recipes
          recipes.length > 0 ? (
            <div className="flex flex-col gap-6">
              <FavoritedRecipes
                recipes={recipes}
                className="w-full"
                onRecipeClick={handleRecipeClick}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No favorite recipes found.
            </p>
          )
        ) : (
          // Show the detailed view of the clicked recipe
          <RecipeCard
            recipe={recipes[currentRecipeIndex]}
            onClose={handleCloseRecipe} // Function to close the detailed view
            onNext={() =>
              setCurrentRecipeIndex((prev) =>
                Math.min(prev + 1, recipes.length - 1)
              )
            }
            onPrevious={() =>
              setCurrentRecipeIndex((prev) => Math.max(prev - 1, 0))
            }
          />
        )}
      </div>
    </div>
  );
}
