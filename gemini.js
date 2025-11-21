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

// Image style templates  
const imageStyles = {
    thumbnail: {
        name: "Professional Thumbnail",
        getPrompt: (anime, prompt) => `Professional anime thumbnail artwork featuring ${anime} characters. ${prompt}. 
        Style: Clean vector art, bold outlines, vibrant flat colors, YouTube thumbnail quality.
        Requirements: Sharp details, no blur, clear character faces, bright lighting, 
        simple background, professional digital art style, high contrast colors.
        Quality: Premium illustration, crisp lines, perfect for social media posting.
        Layout: Centered composition, eye-catching design, perfect for channel thumbnails.`
    },
    cartoon: {
        name: "Cartoon Style",
        getPrompt: (anime, prompt) => `Cute cartoon illustration of ${anime} characters. ${prompt}. 
        Style: Traditional cartoon art, thick black outlines, bright pastel colors, playful design.
        Requirements: Rounded shapes, expressive characters, cheerful atmosphere, child-friendly.
        Quality: Classic cartoon style like 90s animation, fun and energetic.
        Layout: Dynamic composition with whimsical elements.`
    },
    realistic: {
        name: "Realistic Anime",
        getPrompt: (anime, prompt) => `Semi-realistic anime illustration of ${anime} characters. ${prompt}. 
        Style: Detailed anime art, realistic shading, movie poster quality, dramatic lighting.
        Requirements: Detailed textures, depth, cinematic feel, high-quality rendering.
        Quality: Professional anime movie poster, stunning visuals, impressive detail.
        Layout: Dramatic composition with atmospheric background.`
    },
    sketch: {
        name: "Sketch Art",
        getPrompt: (anime, prompt) => `Sketch-style artwork of ${anime} characters. ${prompt}. 
        Style: Hand-drawn pencil sketch, loose lines, artistic feel, manga page quality.
        Requirements: Sketch textures, dynamic linework, unfinished artistic look.
        Quality: Professional manga artist sketch, expressive and raw.
        Layout: Natural sketch composition with fluid motion lines.`
    },
    vibrant: {
        name: "Vibrant Pop Art",
        getPrompt: (anime, prompt) => `Vibrant pop art style ${anime} characters. ${prompt}. 
        Style: Bold colors, high contrast, modern pop art aesthetic, eye-popping design.
        Requirements: Neon colors, energetic vibe, trendy social media style.
        Quality: Instagram-worthy art, super colorful and attractive.
        Layout: Bold composition with maximum visual impact.`
    }
};

// Generate custom anime images - text-only mode (image API not available in free tier)
async function generateAnimeImage(prompt, anime, outputPath, style = null) {
    return null;
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