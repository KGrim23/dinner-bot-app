import { OpenAI } from "openai";

// env.local.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { ingredients } = await req.json(); // Get user input from the request body

  if (!ingredients || ingredients.length === 0) {
    return new Response(JSON.stringify({ error: "No ingredients provided" }), {
      status: 400,
    });
  }

  const prompt = `Given the following ingredients: ${ingredients.join(", ")}
Please suggest 4 recipes using these ingredients. Format each recipe exactly as follows:
Brief description: [A concise description of the recipe in 300 words or less]
Title: [Recipe title]
Time: [Total cooking time in minutes]
Difficulty: [Easy/Medium/Hard]
Ingredients:
[Ingredient 1]
[Ingredient 2]
[...]
How to:
[Step 1]
[Step 2]
[...] 
Ensure that:
The brief description is no longer than 200 words.
Ingredients are listed one per line without any symbols or formatting.
Steps are listed one per line without any symbols or formatting.
There are no additional headers or sections beyond those specified.
The format is consistent across all 4 recipes.
Do not use any numbers, hyphens, bullet points, or any other formatting in any part of the response, including in this list of instructions.
`;

  //   const prompt = `I have the following ingredients: ${ingredients.join(
  //     ", "
  //   )}. Can you suggest 4 recipes? Each recipe should include:
  // 1. Brief description of recipe: [Short paragraph no longer than 150 words]
  // 2. Title: [Recipe title]
  // 3. Time: [Cooking time in minutes]
  // 4. Difficulty: [Easy, Medium, Hard]
  // 5. Ingredients: [List each ingredient on a new line without any symbols or - or number]
  // 6. How to: [List each step on a new line, without sub-numbering and -]
  // Please format the response like this:
  // Brief description: [brief description]
  // Title: [title]
  // Time: [time]
  // Difficulty: [difficulty]
  // Ingredients:
  // [ingredient 1]
  // [ingredient 2]
  // How to:
  // [step 1]
  // [step 2]`;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gemini or claude
      messages: [{ role: "user", content: prompt }],
    });
    console.log("AI Response:", aiResponse);
    const recipeSuggestions = aiResponse.choices[0].message.content.trim();

    return new Response(JSON.stringify({ recipes: recipeSuggestions }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);

    if (error.code === "insufficient_quota") {
      return new Response(
        JSON.stringify({ error: "You have reached your API usage limit." }),
        { status: 403 } // token credit limit is reached
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to generate recipes" }),
      { status: 500 }
    );
  }
}
