const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Image style templates for DALL-E prompts
const imageStyles = {
    thumbnail: {
        name: "Professional Thumbnail",
        getPrompt: (anime, prompt) => `Professional anime thumbnail artwork featuring ${anime} characters. ${prompt}. Style: Clean vector art, bold outlines, vibrant flat colors, YouTube thumbnail quality. Sharp details, no blur, clear character faces, bright lighting, simple background. Premium illustration, crisp lines, eye-catching design.`
    },
    cartoon: {
        name: "Cartoon Style",
        getPrompt: (anime, prompt) => `Cute cartoon illustration of ${anime} characters. ${prompt}. Style: Traditional cartoon art, thick black outlines, bright pastel colors, playful design. Rounded shapes, expressive characters, cheerful atmosphere, child-friendly.`
    },
    realistic: {
        name: "Realistic Anime",
        getPrompt: (anime, prompt) => `Semi-realistic anime illustration of ${anime} characters. ${prompt}. Style: Detailed anime art, realistic shading, movie poster quality, dramatic lighting. Detailed textures, depth, cinematic feel, high-quality rendering.`
    },
    sketch: {
        name: "Sketch Art",
        getPrompt: (anime, prompt) => `Sketch-style artwork of ${anime} characters. ${prompt}. Style: Hand-drawn pencil sketch, loose lines, artistic feel, manga page quality. Sketch textures, dynamic linework, unfinished artistic look.`
    },
    vibrant: {
        name: "Vibrant Pop Art",
        getPrompt: (anime, prompt) => `Vibrant pop art style ${anime} characters. ${prompt}. Style: Bold colors, high contrast, modern pop art aesthetic, eye-popping design. Neon colors, energetic vibe, trendy social media style.`
    }
};

// Download image from URL and save to file
async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filepath);
                });
            } else {
                reject(new Error(`HTTP ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

// Generate custom anime images using DALL-E 3
async function generateAnimeImage(prompt, anime, outputPath, style = null) {
    try {
        // Create images directory if it doesn't exist
        const imageDir = path.dirname(outputPath);
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
        }

        // Select random style if not specified
        const availableStyles = Object.keys(imageStyles);
        const selectedStyle = style || availableStyles[Math.floor(Math.random() * availableStyles.length)];
        const styleTemplate = imageStyles[selectedStyle];
        
        console.log(`🎨 Using ${styleTemplate.name} for image generation (DALL-E 3)`);
        
        // Create style-specific prompts
        const enhancedPrompt = styleTemplate.getPrompt(anime, prompt);

        // Generate image using DALL-E 3
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard"
        });

        if (response.data && response.data.length > 0) {
            const imageUrl = response.data[0].url;
            // Download and save the image
            await downloadImage(imageUrl, outputPath);
            console.log(`🎨 Generated ${styleTemplate.name}: ${outputPath}`);
            return outputPath;
        }

        console.log(`⚠️ No images generated`);
        return null;
    } catch (error) {
        console.log(`⚠️ Image generation failed: ${error.message}`);
        return null;
    }
}

module.exports = { generateAnimeImage };
