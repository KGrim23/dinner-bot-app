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

  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient],
      });
      setIngredient("");
    }
  };

  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      setRecipe({
        ...recipe,
        instructions: [...recipe.instructions, instruction],
      });
      setInstruction("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = [...storedRecipes, recipe];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    router.push("/collections");
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleInstructionKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInstruction();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg mb-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add a New Recipe
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Recipe Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-200"
            placeholder="Enter recipe title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-200"
            placeholder="Enter a short description"
            required
          />
        </div>

        {/* Ingredients Section */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Ingredients
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={handleIngredientKeyDown}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-200"
              placeholder="Add an ingredient"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex justify-between items-center">
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
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Instructions (Step-by-step)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={handleInstructionKeyDown}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-200"
              placeholder="Add an instruction step"
            />
            <button
              type="button"
              onClick={handleAddInstruction}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="list-decimal list-inside mt-2 text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex justify-between items-center">
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
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Prep Time (in minutes)
          </label>
          <input
            type="number"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-200"
            placeholder="e.g. 20"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
