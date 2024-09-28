"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState(""); // Store the recipe suggestions as a string
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
        // Set the response directly to the recipes state
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

  // Extract recipe titles and descriptions from the recipes string
  const extractRecipes = () => {
    if (!recipes) return [];
    return recipes.split("\n\n").map((recipe) => {
      const [titlePart, bodyPart] = recipe.split("\n");
      const title = titlePart.replace("Title: ", "").trim();
      const body = bodyPart.replace("How to: ", "").trim();
      return { title, body };
    });
  };

  const extractedRecipes = extractRecipes();

  return (
    <div className="flex flex-col items-center min-h-screen py-2 px-4 m-5">
      <Image
        src="/dinner_bot.png"
        alt="Logo"
        width={300}
        height={300}
        className="text-center item-center mb-4"
      />
      <h3 className="text-md text-gray-500 mb-4">
        Let us know what you&apos;ve got in your fridge!
      </h3>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
          className="w-full text-gray-600 p-2 border border-gray-900 bg-gray-200 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Fetching recipes..." : "Find Recipes"}
        </button>
      </form>
      <div className="mt-6 w-full max-w-md mb-6">
        {error && <p className="text-red-500">{error}</p>}
        {extractedRecipes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Recipe Suggestions:</h2>
            {/* Display each recipe without mapping TODO: map over the recipes*/}
            <div className="p-4 border border-gray-300 bg-gray-300 rounded shadow-md">
              <h3 className="text-lg font-semibold text-blue-600">
                {extractedRecipes[0]?.title}
              </h3>
              <p className="mt-2 text-gray-700">{extractedRecipes[0]?.body}</p>
            </div>
            <div className="p-4 border border-gray-300 bg-gray-300  rounded shadow-md">
              <h3 className="text-lg font-semibold text-blue-600">
                {extractedRecipes[1]?.title}
              </h3>
              <p className="mt-2 text-gray-700">{extractedRecipes[1]?.body}</p>
            </div>
            <div className="p-4 border border-gray-300 bg-gray-300  rounded shadow-md">
              <h3 className="text-lg font-semibold text-blue-600">
                {extractedRecipes[2]?.title}
              </h3>
              <p className="mt-2 text-gray-700">{extractedRecipes[2]?.body}</p>
            </div>
            <div className="p-4 border border-gray-300 bg-gray-300  rounded shadow-md">
              <h3 className="text-lg font-semibold text-blue-600">
                {extractedRecipes[3]?.title}
              </h3>
              <p className="mt-2 text-gray-700">{extractedRecipes[3]?.body}</p>
            </div>
            <div className="p-4 mt-4 itemms-center text-center">
              <p className=" text-pink-600 font-semibold mt-4 italic">
                bon appétit
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
