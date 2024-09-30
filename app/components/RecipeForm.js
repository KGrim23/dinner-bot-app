"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function RecipeForm({
  handleSubmit,
  loading,
  ingredients,
  setIngredients,
  setError,
}) {
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError(""); // Clear error before the request

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
        handleSubmit(data.recipes); // Send recipes data to handleSubmit
      } else {
        setError(data.error || "An error occurred while fetching recipes.");
      }
    } catch (error) {
      setError("Failed to fetch recipes. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmitForm} // Use the updated handleSubmitForm function
      className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center"
    >
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        className="w-full text-gray-600 p-2 border border-gray-900 bg-gray-200 rounded mb-4"
      />
      <button
        type="submit"
        className="bg-black text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Fetching recipes...." : "Find Recipes"}
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
