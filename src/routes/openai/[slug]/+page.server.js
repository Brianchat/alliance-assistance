import { error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from "$env/static/private"
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  if (!configuration.apiKey) {
    throw error(500, 'OpenAI API key not configured: '+ OPENAI_API_KEY);
  }

  const animal = params.slug || '';
  if (animal.trim().length === 0) {
    throw error(400, 'Please enter a valid animal');
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    return { animal, result: completion.data.choices[0].text };
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      throw error(error.response.status, error.response.data);
    } else {
      throw error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}
