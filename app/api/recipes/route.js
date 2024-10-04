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
Given the following ingredients: ${ingredients}
Please suggest 5 recipes using these ingredients. Format each recipe as follows:

ID: [Unique recipe ID]
Title: [Recipe title]
Time: [Total cooking time in minutes]
Difficulty: [Easy/Medium/Hard]
Brief description: [A concise description of the recipe in 100 words or less]
Ingredients:
[Ingredient 1]
[Ingredient 2]
[...]
How to:
[Step 1]
[Step 2]
[...]

Ensure that:
- Each recipe has a unique ID.
- The brief description is no longer than 100 words.
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
    console.log(recipes);

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
