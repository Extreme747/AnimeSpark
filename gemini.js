const { GoogleGenAI, Modality } = require("@google/genai");
const fs = require("fs");
const path = require("path");

// Initialize Gemini AI
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

// Generate AI-enhanced anime post content
async function enhanceAnimePost(baseContent, anime, postType) {
    try {
        const prompt = `Make this ${anime} ${postType} post more engaging and fun in Hinglish GenZ style. 
        Add creative elements, witty one-liners, and make it more entertaining while keeping it under 200 words.
        Use emojis strategically and maintain the fun anime vibe:

        ${baseContent}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text || baseContent;
    } catch (error) {
        console.log(`⚠️ AI enhancement failed, using original: ${error.message}`);
        return baseContent;
    }
}

// Generate custom anime images
async function generateAnimeImage(prompt, anime, outputPath) {
    try {
        // Create images directory if it doesn't exist
        const imageDir = path.dirname(outputPath);
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
        }

        const enhancedPrompt = `Cute anime style illustration of ${anime} characters. ${prompt}. 
        Bright colors, child-friendly, cartoon style similar to Japanese anime. 
        High quality, vibrant, cheerful mood.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        const candidates = response.candidates;
        if (!candidates || candidates.length === 0) {
            return null;
        }

        const content = candidates[0].content;
        if (!content || !content.parts) {
            return null;
        }

        for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
                const imageData = Buffer.from(part.inlineData.data, "base64");
                fs.writeFileSync(outputPath, imageData);
                console.log(`🎨 Generated image: ${outputPath}`);
                return outputPath;
            }
        }

        return null;
    } catch (error) {
        console.log(`⚠️ Image generation failed: ${error.message}`);
        return null;
    }
}

// Generate creative captions for images
async function generateImageCaption(anime, postType, content) {
    try {
        const prompt = `Create a super fun and catchy Instagram-style caption in Hinglish for a ${anime} ${postType} post. 
        Make it short (max 30 words), engaging, and include 2-3 relevant emojis. 
        
        Post content: ${content}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text || `${anime} vibes! 🔥✨`;
    } catch (error) {
        console.log(`⚠️ Caption generation failed: ${error.message}`);
        return `${anime} vibes! 🔥✨`;
    }
}

// Generate custom trivia questions
async function generateCustomTrivia(anime) {
    try {
        const prompt = `Create a fun trivia question about ${anime} with 3 multiple choice options in Hinglish style. 
        Make it engaging and not too difficult. Format as JSON:
        {
            "question": "your question here",
            "options": ["option1", "option2", "option3"],
            "answer": "correct option"
        }`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        question: { type: "string" },
                        options: { type: "array", items: { type: "string" } },
                        answer: { type: "string" }
                    },
                    required: ["question", "options", "answer"],
                },
            },
            contents: prompt,
        });

        const rawJson = response.text;
        if (rawJson) {
            return JSON.parse(rawJson);
        }
        return null;
    } catch (error) {
        console.log(`⚠️ Custom trivia generation failed: ${error.message}`);
        return null;
    }
}

module.exports = {
    enhanceAnimePost,
    generateAnimeImage,
    generateImageCaption,
    generateCustomTrivia
};