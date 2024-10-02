import React from "react";

export default function RecipeCard({
  recipe,
  error,
  onClose,
  onNext,
  onPrevious,
}) {
  if (!recipe) {
    return <p className="text-red-500">No recipe data available.</p>;
  }

  return (
    <div className="mt-8 mb-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-black">{recipe.title}</h3>
        </div>

        <div className="flex space-x-2 mt-2">
          <span className="bg-black text-white text-xs font-small px-3 py-1 rounded-full">
            ⏰ {recipe.time}
          </span>
          <span className="bg-black text-white text-xs font-small px-3 py-1 rounded-full">
            🎯 {recipe.difficulty}
          </span>
        </div>

        {/* Display the brief description */}
        <p className="text-sm md:text-lg text-green-900 italic mb-5 mt-5">
          {recipe.description}
        </p>

        {/* Display the ingredients */}
        <h3 className="mt-8 text-md md:text-xl font-semibold">
          🍅 Ingredients:
        </h3>
        <ul className="list-disc ml-5">
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="text-gray-700 md:text-lg">
                {ingredient}
              </li>
            ))
          ) : (
            <li className="text-gray-700">No ingredients listed.</li>
          )}
        </ul>

        {/* Display the steps */}
        <h3 className="mt-8 text-md md:text-lg font-semibold">
          ♨️ Instructions:
        </h3>
        <ul className="list-decimal ml-5 pb-8">
          {recipe.steps && recipe.steps.length > 0 ? (
            recipe.steps.map((step, i) => (
              <li key={i} className="text-gray-700 md:text-lg mr-5">
                {step}
              </li>
            ))
          ) : (
            <li className="text-gray-700">No instructions listed.</li>
          )}
        </ul>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={onPrevious}
            className="bg-black text-white px-4 py-2 text-xs rounded hover:bg-blue-400 transition-all disabled:opacity-0 w-full"
            disabled={recipe.index === 0} // Disable if it's the first recipe
          >
            Previous
          </button>

          {/* Back to all recipes */}
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 text-xs rounded hover:bg-blue-400 transition-all w-full"
          >
            All Recipes
          </button>

          <button
            onClick={onNext}
            className="bg-black text-white px-4 py-2 text-xs rounded hover:bg-blue-400 transition-all disabled:opacity-0 w-full"
            disabled={recipe.index === recipe.length - 1} // Disable if it's the last recipe
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// export default function RecipeCard({ extractedRecipes, error }) {
//   return (
//     <div className="mt-6 mb-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
//       {error && <p className="text-red-500">{error}</p>}
//       {extractedRecipes.length > 0 && (
//         <div className="space-y-6">
//           <h2 className="text-xl text-center font-semibold mb-4 mt-8">
//             Recipe Suggestions:
//           </h2>

//           {/* Display each recipe */}
//           {extractedRecipes.map((recipe, index) => (
//             <div
//               key={index}
//               className="p-4 border border-gray-300 bg-slate-200 rounded"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-lg font-semibold text-black">
//                   {recipe.title}
//                 </h3>
//               </div>
//               <div className="flex space-x-2 mt-2">
//                 <span className="bg-black text-white text-xs font-small px-3 py-1 rounded-full">
//                   ⏰ {recipe.time}
//                 </span>
//                 <span className="bg-black text-white text-xs font-small px-3 py-1 rounded-full">
//                   🎯 {recipe.difficulty}
//                 </span>
//               </div>

//               {/* Display the brief description */}
//               <p className="text-sm text-green-900 italic mb-5 mt-5">
//                 {recipe.description}
//               </p>

//               {/* Display the ingredients */}
//               <h3 className="mt-8 text-md font-semibold">🍅 Ingredients:</h3>
//               <ul className="list-disc ml-5">
//                 {recipe.ingredients.map((ingredient, i) => (
//                   <li key={i} className="text-gray-700">
//                     {ingredient}
//                   </li>
//                 ))}
//               </ul>

//               {/* Display the steps */}
//               <h3 className="mt-8 text-md font-semibold">♨️ Instructions:</h3>
//               <ul className="list-decimal ml-5">
//                 {recipe.steps.map((step, i) => (
//                   <li key={i} className="text-gray-700 mr-5">
//                     {step}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Optional: Uncomment this section for a final message */}
//           {/* <div className="p-4 mt-6 text-center">
//             <p className="text-pink-600 font-semibold mt-4 italic">
//               Bon appétit!
//             </p>
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// }
