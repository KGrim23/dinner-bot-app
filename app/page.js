"use client";
import RecipeCard from "./components/RecipeCard.js";
import RecipeForm from "./components/RecipeForm.js";
import React, { useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState(""); // Define recipes state
  const [ingredients, setIngredients] = useState(""); // State for input ingredients
  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading status

  const extractRecipes = () => {
    if (!recipes || typeof recipes !== "string") return [];

    return recipes.split("\n\n").map((recipe) => {
      const descriptionMatch = recipe.match(/Brief description:\s*(.*)/);
      const titleMatch = recipe.match(/Title:\s*(.*)/);
      const ingredientsMatch = recipe.match(
        /Ingredients:\s*([\s\S]*?)\nHow to:/
      );
      const howToMatch = recipe.match(/How to:\s*([\s\S]*)/);

      const description = descriptionMatch
        ? descriptionMatch[1].trim()
        : "No Description";
      const title = titleMatch ? titleMatch[1].trim() : "No Title";
      const ingredients = ingredientsMatch
        ? ingredientsMatch[1]
            .split("\n")
            .map((ingredient) => ingredient.trim())
            .filter(Boolean)
        : [];
      const steps = howToMatch
        ? howToMatch[1]
            .split("\n")
            .map((step) => step.trim())
            .filter(Boolean)
        : [];

      return { description, title, ingredients, steps };
    });
  };

  const extractedRecipes = extractRecipes();

  // Updated handleSubmit function to fetch recipes based on ingredients
  const handleSubmit = async () => {
    setLoading(true); // Set loading to true while fetching
    setError(""); // Clear any existing errors

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredients
            .split(",")
            .map((ingredient) => ingredient.trim()),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setRecipes(data.recipes); // Update recipes with fetched data
      } else {
        setError(data.error || "An error occurred while fetching recipes.");
      }
    } catch (error) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  const handleCreateMoreRecipes = async () => {
    // Scroll to the top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Use a timeout to allow scrolling to complete before fetching
    await new Promise((resolve) => setTimeout(resolve, 300));

    await handleSubmit(); // Fetch new recipes
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-md text-gray-500 mb-4">
        Let us know what you&apos;ve got in your fridge!
      </h3>

      <RecipeForm
        handleSubmit={handleSubmit}
        loading={loading}
        ingredients={ingredients}
        setIngredients={setIngredients}
        setError={setError}
        setLoading={setLoading}
      />

      <RecipeCard extractedRecipes={extractedRecipes} error={error} />

      {extractedRecipes.length > 0 && (
        <button
          onClick={handleCreateMoreRecipes} // Use the new handler for button click
          className="bg-slate-400 text-white text-sm font-thin p-2 mb-4 rounded"
          disabled={loading}
        >
          {loading ? "Fetching more recipes ...." : "Create More Recipes"}
        </button>
      )}
    </div>
  );
}
