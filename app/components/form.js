// components/RecipeForm.js
import React from "react";

export default function RecipeForm({
  handleSubmit,
  loading,
  ingredients,
  setIngredients,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
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
        {loading ? "Fetching recipes..." : "Find Recipes"}
      </button>
    </form>
  );
}
