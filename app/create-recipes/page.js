"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
    prepTime: "",
  });

  const [ingredient, setIngredient] = useState(""); // Temporary ingredient input
  const [instruction, setInstruction] = useState(""); // Temporary instruction input
  const router = useRouter();

  // Handle form field changes
  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding a single ingredient to the list
  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient],
      });
      setIngredient(""); // Clear input after adding
    }
  };

  // Handle adding a single instruction step to the list
  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      setRecipe({
        ...recipe,
        instructions: [...recipe.instructions, instruction],
      });
      setInstruction(""); // Clear input after adding
    }
  };

  // Handle form submission (saving recipe to localStorage)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Add new recipe
    const updatedRecipes = [...storedRecipes, recipe];

    // Save updated recipe list to localStorage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Redirect to the collections page
    router.push("/collections");
  };

  // Handle pressing Enter key for ingredient input
  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter
      handleAddIngredient();
    }
  };

  // Handle pressing Enter key for instruction input
  const handleInstructionKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter
      handleAddInstruction();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-00 mt-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Recipe Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter recipe title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter a short description"
            required
          />
        </div>

        {/* Ingredients Section */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Ingredients
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={handleIngredientKeyDown} // Handle Enter key
              className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add an ingredient"
            />
          </div>
          {/* Display Ingredients List */}
          <ul className="list-disc list-inside mt-2">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex justify-between">
                {ing}
                <button
                  type="button"
                  onClick={() =>
                    setRecipe({
                      ...recipe,
                      ingredients: recipe.ingredients.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                  className="text-red-500 hover:underline ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Instructions (Step-by-step)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={handleInstructionKeyDown} // Handle Enter key
              className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add an instruction step"
            />
          </div>
          {/* Display Instructions List */}
          <ul className="list-decimal list-inside mt-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex justify-between">
                {step}
                <button
                  type="button"
                  onClick={() =>
                    setRecipe({
                      ...recipe,
                      instructions: recipe.instructions.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                  className="text-red-500 hover:underline ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Prep Time */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Prep Time (in minutes)
          </label>
          <input
            type="number"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g. 20"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-normal py-2 px-4 rounded hover:bg-gray-800 transition-colors"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
