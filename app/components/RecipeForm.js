"use client";
import React from "react";
import Image from "next/image";

export default function RecipeForm({
  ingredients,
  setIngredients,
  setRecipes,
  setError,
  loading,
  setLoading,
  hasRecipes,
}) {
  const handleSubmitForm = async (e) => {
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
      console.log("API Response Data:", data); // Debugging log

      if (res.ok) {
        setRecipes(data.recipes);
        setLoading(false);
      } else {
        setError(data.error || "An error occurred while fetching recipes.");
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch recipes. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center"
    >
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        className="w-full text-gray-600 p-2 border border-gray-900 bg-gray-200 rounded mb-4"
        style={{ fontSize: "16px" }}
      />
      <button
        type="submit"
        className="bg-black text-white p-2 rounded w-full mb-2"
        disabled={loading}
      >
        {loading
          ? "Fetching recipes...."
          : hasRecipes
          ? "Find More Recipes"
          : "Find Recipes"}
      </button>

      {loading && (
        <Image
          src="https://media.tenor.com/-0nrZ8IubicAAAAi/raf-rafs.gif"
          alt="Cooking Robot"
          width={200}
          height={200}
          className="my-24"
        />
      )}
    </form>
  );
}
