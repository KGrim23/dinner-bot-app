"use client";

import React, { useState, useEffect } from "react";
import RecipeForm from "./RecipeForm";
import AllRecipes from "./AllRecipes";

export default function HomePage() {
  const [recipes, setRecipes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const extractRecipes = () => {
    if (!recipes || typeof recipes !== "string") return [];

    return recipes.split("\n\n").map((recipe) => {
      const descriptionMatch = recipe.match(/Brief description:\s*(.*)/);
      const titleMatch = recipe.match(/Title:\s*(.*)/);
      const timeMatch = recipe.match(/Time:\s*(.*)/);
      const difficultyMatch = recipe.match(/Difficulty:\s*(.*)/);
      const servingMatch = recipe.match(/Serving:\s*(.*)/);
      const ingredientsMatch = recipe.match(
        /Ingredients:\s*([\s\S]*?)\nHow to:/
      );
      const howToMatch = recipe.match(/How to:\s*([\s\S]*)/);

      const description = descriptionMatch
        ? descriptionMatch[1].trim()
        : "No Description";
      const title = titleMatch ? titleMatch[1].trim() : "No Title";
      const time = timeMatch ? timeMatch[1].trim() : "No Time";
      const difficulty = difficultyMatch
        ? difficultyMatch[1].trim()
        : "No Difficulty";
      const serving = servingMatch ? servingMatch[1].trim() : "No Serving";
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

      return {
        description,
        title,
        time,
        difficulty,
        serving,
        ingredients,
        steps,
      };
    });
  };

  const extractedRecipes = extractRecipes();

  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col mb-16 items-center justify-center relative">
      <h3 className="text-md text-gray-600 mb-4">
        Let us know what you&apos;ve got in your fridge!
      </h3>

      <RecipeForm
        ingredients={ingredients}
        setIngredients={setIngredients}
        setRecipes={setRecipes}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        setHasFetched={setHasFetched}
        hasRecipes={extractedRecipes.length > 0}
      />

      {/* <RecipeCard extractedRecipes={extractedRecipes} error={error} /> */}
      <AllRecipes extractedRecipes={extractedRecipes} error={error} />

      {showScrollButton && (
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="bg-slate-400 bottom-4 right-4 text-white text-sm font-thin p-2 mb-4 rounded"
        >
          🔝
        </button>
      )}
    </div>
  );
}
