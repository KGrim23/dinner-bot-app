import { OpenAI } from "openai";
import { z } from "zod";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define input schema
const ingredientsSchema = z.object({
  ingredients: z.array(z.string()).nonempty(),
});

// Helper function to create API response
const createResponse = (body, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// Generate prompt for OpenAI
const generatePrompt = (ingredients) => `
Given the following ingredients: ${ingredients.join(", ")}
Please suggest 5 recipes using these ingredients. Format each recipe as follows:

Title: [Recipe title]
Time: [Total cooking time in minutes]
Difficulty: [Easy/Medium/Hard]
Brief description: [A concise description of the recipe in 150 words or less]
Ingredients:
[Ingredient 1]
[Ingredient 2]
[...]
How to:
[Step 1]
[Step 2]
[...]

Ensure that:
- The brief description is no longer than 150 words.
- Ingredients and steps are listed one per line without any symbols or formatting.
- The format is consistent across all 5 recipes.
- Do not use any numbers, hyphens, bullet points, or any other formatting in the response.
`;

export async function POST(req) {
  try {
    // Parse and validate input
    const body = await req.json();
    const { ingredients } = ingredientsSchema.parse(body);

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use GPT-4 if needed for more complex outputs
      messages: [{ role: "user", content: generatePrompt(ingredients) }],
      temperature: 0.5, // Balance between creativity and consistency; lower for stricter structure
      max_tokens: 2000, // Ensure enough space for 7 recipes, input tokens included
      top_p: 1, // Default setting to consider the most likely tokens
      frequency_penalty: 0, // No penalty for repeating tokens
      presence_penalty: 0, // No penalty for introducing new ideas
    });

    const recipes = aiResponse.choices[0].message.content.trim();

    // Return successful response
    return createResponse({ recipes });
  } catch (error) {
    console.error("Error in recipe generation:", error);

    // Handle specific errors
    if (error instanceof z.ZodError) {
      return createResponse({ error: "Invalid input format" }, 400);
    }

    if (error.code === "insufficient_quota") {
      return createResponse({ error: "API usage limit reached" }, 403);
    }

    // Generic error response
    return createResponse({ error: "Failed to generate recipes" }, 500);
  }
}
// import { OpenAI } from "openai";

// // env.local.OPENAI_API_KEY
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   const { ingredients } = await req.json(); // Get user input from the request body

//   if (!ingredients || ingredients.length === 0) {
//     return new Response(JSON.stringify({ error: "No ingredients provided" }), {
//       status: 400,
//     });
//   }

//   const prompt = `Given the following ingredients: ${ingredients.join(", ")}
//   Please suggest 7 recipes using these ingredients. Format each recipe exactly as follows:

//   Title: [Recipe title]
//   Time: [Total cooking time in minutes]
//   Difficulty: [Easy/Medium/Hard]
//   Brief description: [A concise description of the recipe in 200 words]
//   Ingredients:
//   [Ingredient 1]
//   [Ingredient 2]
//   [...]
//   How to:
//   [Step 1]
//   [Step 2]
//   [...]
//   Ensure that:
//   The brief description is no longer than 200 words.
//   Ingredients are listed one per line without any symbols or formatting.
//   Steps are listed one per line without any symbols or formatting.
//   There are no additional headers or sections beyond those specified.
//   The format is consistent across all 4 recipes.
//   Do not use any numbers, hyphens, bullet points, or any other formatting in any part of the response, including in this list of instructions.
//   `;

//   try {
//     const aiResponse = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or gemini or claude
//       messages: [{ role: "user", content: prompt }],
//     });
//     console.log("AI Response:", aiResponse);
//     const recipeSuggestions = aiResponse.choices[0].message.content.trim();

//     return new Response(JSON.stringify({ recipes: recipeSuggestions }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error with OpenAI API:", error);

//     if (error.code === "insufficient_quota") {
//       return new Response(
//         JSON.stringify({ error: "You have reached your API usage limit." }),
//         { status: 403 } // token credit limit is reached
//       );
//     }

//     return new Response(
//       JSON.stringify({ error: "Failed to generate recipes" }),
//       { status: 500 }
//     );
//   }
// }
