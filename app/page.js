"use client";
import RecipeCard from "./components/RecipeCard.js";
import RecipeForm from "./components/RecipeForm.js";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState(""); // Define recipes state
  const [ingredients, setIngredients] = useState(""); // State for input ingredients
  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading status
  const [hasFetched, setHasFetched] = useState(false); // State to track if recipes have been fetched
  const [showScrollButton, setShowScrollButton] = useState(false); // State to control Scroll to Top button visibility

  const extractRecipes = () => {
    if (!recipes || typeof recipes !== "string") return [];

    return recipes.split("\n\n").map((recipe) => {
      const descriptionMatch = recipe.match(/Brief description:\s*(.*)/);
      const titleMatch = recipe.match(/Title:\s*(.*)/);
      const ingredientsMatch = recipe.match(
        /Ingredients:\s*([\s\S]*?)\nHow to:/
      );
      const howToMatch = recipe.match(/How to:\s*([\s\S]*)/);

      const description = descriptionMatch
        ? descriptionMatch[1].trim()
        : "No Description";
      const title = titleMatch ? titleMatch[1].trim() : "No Title";
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

      return { description, title, ingredients, steps };
    });
  };

  const extractedRecipes = extractRecipes();

  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true); // Show button after scrolling down 300px
      } else {
        setShowScrollButton(false); // Hide button when above 300px
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h3 className="text-md text-gray-500 mb-4">
        Let us know what you&apos;ve got in your fridge!
      </h3>

      <RecipeForm
        ingredients={ingredients}
        setIngredients={setIngredients}
        setRecipes={setRecipes}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        setHasFetched={setHasFetched} // Pass the function to set hasFetched
        hasRecipes={extractedRecipes.length > 0} // Pass whether there are recipes
      />

      <RecipeCard extractedRecipes={extractedRecipes} error={error} />

      {showScrollButton && ( // Render Scroll to Top button based on scroll position
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

// "use client";
// import RecipeCard from "./components/RecipeCard.js";
// import RecipeForm from "./components/RecipeForm.js";
// import React, { useState } from "react";

// export default function Home() {
//   const [recipes, setRecipes] = useState(""); // Define recipes state
//   const [ingredients, setIngredients] = useState(""); // State for input ingredients
//   const [error, setError] = useState(""); // State for error handling
//   const [loading, setLoading] = useState(false); // State for loading status

//   const extractRecipes = () => {
//     if (!recipes || typeof recipes !== "string") return [];

//     return recipes.split("\n\n").map((recipe) => {
//       const descriptionMatch = recipe.match(/Brief description:\s*(.*)/);
//       const titleMatch = recipe.match(/Title:\s*(.*)/);
//       const ingredientsMatch = recipe.match(
//         /Ingredients:\s*([\s\S]*?)\nHow to:/
//       );
//       const howToMatch = recipe.match(/How to:\s*([\s\S]*)/);

//       const description = descriptionMatch
//         ? descriptionMatch[1].trim()
//         : "No Description";
//       const title = titleMatch ? titleMatch[1].trim() : "No Title";
//       const ingredients = ingredientsMatch
//         ? ingredientsMatch[1]
//             .split("\n")
//             .map((ingredient) => ingredient.trim())
//             .filter(Boolean)
//         : [];
//       const steps = howToMatch
//         ? howToMatch[1]
//             .split("\n")
//             .map((step) => step.trim())
//             .filter(Boolean)
//         : [];

//       return { description, title, ingredients, steps };
//     });
//   };

//   const extractedRecipes = extractRecipes();

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h3 className="text-md text-gray-500 mb-4">
//         Let us know what you&apos;ve got in your fridge!
//       </h3>

//       <RecipeForm
//         ingredients={ingredients}
//         setIngredients={setIngredients}
//         setRecipes={setRecipes}
//         setError={setError}
//         loading={loading}
//         setLoading={setLoading}
//       />

//       <RecipeCard extractedRecipes={extractedRecipes} error={error} />

//       {extractedRecipes.length > 0 && (
//         <button
//           onClick={async () => {
//             window.scrollTo({
//               top: 0,
//               behavior: "smooth",
//             });
//           }}
//           className="bg-slate-400 text-white text-sm font-thin p-2 mb-4 rounded"
//           disabled={loading}
//         >
//           {loading ? "Fetching more recipes ...." : "Create More Recipes"}
//         </button>
//       )}
//     </div>
//   );
// }
