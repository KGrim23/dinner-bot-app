import { OpenAI } from "openai"; // Correct import for OpenAI SDK v4.x

// env.local.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { ingredients } = await req.json(); // Get the body

  if (!ingredients || ingredients.length === 0) {
    return new Response(JSON.stringify({ error: "No ingredients provided" }), {
      status: 400,
    });
  }

  // Create the prompt limit to 4 receipes
  const prompt = `I have the following ingredients: ${ingredients.join(
    ", "
  )}. Can you suggest a 4 recipes, each with a title and a description? Please format them as follows: 
  Title: [title]
  How to: [description]`;

  // const prompt = `I have the following ingredients: ${ingredients.join(
  //   ", "
  // )}. Can you suggest a 4 recipes I can make using these ingredients?`;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "text-davinci-003"
      messages: [{ role: "user", content: prompt }],
    });

    const recipeSuggestions = aiResponse.choices[0].message.content.trim();

    // Log the recipe suggestions
    console.log("Recipe Suggestions:", recipeSuggestions);

    return new Response(JSON.stringify({ recipes: recipeSuggestions }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);

    if (error.code === "insufficient_quota") {
      return new Response(
        JSON.stringify({ error: "You have reached your API usage limit." }),
        { status: 403 } // Forbidden, as the quota limit is reached
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to generate recipes" }),
      { status: 500 }
    );
  }
}
