import { OpenAI } from "openai"; // Correct import for OpenAI SDK v4.x

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

  const prompt = `I have the following ingredients: ${ingredients.join(
    ", "
  )}. Can you suggest 1 recipe? Each recipe should include:
  1. Brief description of recipe: [Short paragraph no longer than 100 words]
  2. Title: [Recipe title]
  3. Ingredients: [List each ingredient on a new line without any symbols or - or number]
  4. How to: [List each step on a new line, without sub-numbering and -]
  Please format the response like this:
  Brief description: [brief description]
  Title: [title]
  Ingredients:
  [ingredient 1]
  [ingredient 2]
  How to:
  [step 1]
  [step 2]`;

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
