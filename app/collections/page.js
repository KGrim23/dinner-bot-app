"use client";

import { useEffect, useState } from "react";

export default function Collections() {
  const [recipes, setRecipes] = useState([]);

  // Load recipes from localStorage when the component mounts
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 mt-10 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Recipe Collection</h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-700">
          No recipes added yet. Add some!
        </p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.description}</p>
              <p>
                <strong>Prep Time:</strong> {recipe.prepTime} minutes
              </p>
              <div>
                <h3 className="font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mt-2">Instructions:</h3>
                <ol className="list-decimal list-inside">
                  {recipe.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
