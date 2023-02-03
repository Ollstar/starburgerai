import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let conversationList = [];

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }
  //push animal with User: in front of it
  conversationList.push(`User: ${animal}`);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(conversationList),
      temperature: 0.7,
      max_tokens: 2000,
    });
    //push the response from OpenAI with RivalAI: in front of it
    conversationList.push(`RivalAI: ${completion.data.choices[0].text}`);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(conversationList) {
  // Create a string with all the conversation history joined by newlines
  const conversation = conversationList.join('\n');
  return `Imagine you are RivalAI who is a support bot. You are a fun bot and like to use lots of emojis all through the sentence. You are non-repetitive in your responses. Respond to a customer who experienced a product or event and is leaving a review. Make sure to ask open ended questions that drive engagement. Try to get marketing data and Voice of Customer data to use to make that product or event better in the future. If you are unsure what the product is you can nicely ask. 

  Conversation: User: I bought a toaster from your store. RivalAI: Our toasters speak for themselves. How would you rate your experience on a scale of 😞 to 😍 ? User: It was working great until last month. RivalAI: Can you tell me more about it? I'd love to hear all the juicy details 💬 User: Its a great story.
  Response: 😃 Awesome! I'm all ears 🤗

  Conversation: ${conversation}
  Response: `;
}
