import React from "react";

export default function RecipesCard({ extractedRecipes, error }) {
  return (
    <div className="mt-6 mb-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      {error && <p className="text-red-500">{error}</p>}
      {extractedRecipes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl text-center font-semibold mb-4 mt-8">
            Recipe Suggestions:
          </h2>

          {/* Display each recipe */}
          {extractedRecipes.map((recipe, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 bg-gray-300 rounded"
            >
              <h3 className="text-lg font-semibold text-black">
                {recipe.title}
              </h3>

              {/* Display the brief description */}
              <p className="text-sm text-green-900 italic mb-5 mt-5">
                {recipe.description}
              </p>

              {/* Display the ingredients */}
              <h3 className="mt-8 text-md font-semibold">🍅 Ingredients:</h3>
              <ul className="list-disc ml-5">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>

              {/* Display the steps */}
              <h3 className="mt-8 text-md font-semibold">♨️ Instructions:</h3>
              <ul className="list-decimal ml-5">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="text-gray-700 mr-5">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="p-4 mt-6 text-center">
            <p className="text-pink-600 font-semibold mt-4 italic">
              Bon appétit!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
