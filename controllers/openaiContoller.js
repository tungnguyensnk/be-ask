const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImg = async (req, res) => {
  const { prompt, size } = req.body;
  const imgSize =
    size === "small"
      ? "256x256"
      : size === "medium"
      ? "512x512"
      : size === "large"
      ? "1024x1024"
      : "1920x1920";

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 2,
      size: imgSize,
    });
    res.status(200).json({ data: response.data.data });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res
      .status(400)
      .json({ succes: false, message: "Image can not be generate" });
  }
};

const generateText = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    res.status(200).json({ message: response.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({ succes: false, message: error.message });
  }
};

module.exports = { generateText, generateImg };
