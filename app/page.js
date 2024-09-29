"use client";
import Image from "next/image";
import { useState } from "react";
import RecipeForm from "./components/form.js";
import RecipesCard from "./components/recipes_card.js";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
        // Set the response
        setRecipes(data.recipes);
      } else {
        setError(data.error || "An error occurred while fetching recipes.");
      }
    } catch (error) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Improved function to extract recipes
  const extractRecipes = () => {
    if (!recipes) return [];

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
            .filter(Boolean) // Remove empty strings
        : [];
      const steps = howToMatch
        ? howToMatch[1]
            .split("\n")
            .map((step) => step.trim())
            .filter(Boolean) // Remove empty strings
        : [];

      return { description, title, ingredients, steps };
    });
  };

  const extractedRecipes = extractRecipes();

  return (
    <div className="flex flex-col items-center min-h-screen py-2 px-0 m-5">
      <Image
        src="/dinner_bot_logo.png"
        alt="Logo"
        width={300}
        height={300}
        className="text-center item-center mb-4 sm:max-w-md md:max-w-lg lg:max-w-xl"
      />
      <h3 className="text-md text-gray-500 mb-4">
        Let us know what you&apos;ve got in your fridge!
      </h3>

      <RecipeForm
        handleSubmit={handleSubmit}
        loading={loading}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      {/* Pass extractedRecipes and error to RecipesCard */}
      <RecipesCard extractedRecipes={extractedRecipes} error={error} />
      {/* <button
        type="submit"
        className="bg-black text-white p-2 rounded w-1/2"
        disabled={loading}
      >
        {loading ? "Fetching more recipes ...." : "Create More Recipes"}
      </button> */}
    </div>
  );
}
