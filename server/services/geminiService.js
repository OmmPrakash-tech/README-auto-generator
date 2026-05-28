const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateReadme(prompt) {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(prompt);

        const response = await result.response;

        return response.text();

    } catch (error) {

        console.error(error);

        throw error;
    }

}

module.exports = generateReadme;