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
        <p className=" text-pink-600 font-semibold mt-4 italic">bon appétit</p>
      </div>
    </div>
  )}
</div>;
