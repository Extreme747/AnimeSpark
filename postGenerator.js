const { animeDatabase, getRandomItem, formatDate } = require('./animeData');
const { enhanceAnimePost, generateAnimeImage, generateImageCaption, generateCustomTrivia } = require('./gemini');
const { wasRecentlyPosted } = require('./historyManager');
const fs = require('fs');
const path = require('path');

// Escape special characters for Telegram MarkdownV2
function escapeMarkdownV2(text) {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/_/g, '\\_')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/~/g, '\\~')
        .replace(/`/g, '\\`')
        .replace(/>/g, '\\>')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!');
}

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Generate hashtags based on anime and post type
function getHashtags(anime, postType) {
    const animeHashtags = anime === 'doraemon' 
        ? ['#Doraemon', '#Nobita', '#AnimeLovers', '#DoraemonFans']
        : ['#Shinchan', '#CrayonShinchan', '#AnimeComedy', '#ShinchanFans'];
    
    const typeHashtags = {
        'Episode Summary': ['#AnimeEpisodes', '#MustWatch'],
        'Trivia': ['#AnimeTrivia', '#QuizTime'],
        'Today in History': ['#AnimeHistory', '#ThrowbackThursday'],
        'Poll': ['#Polls', '#Vote'],
        'Anime Facts': ['#AnimeFacts', '#DidYouKnow'],
        'Anime Stories': ['#AnimeStories', '#Storytime'],
        'Anime News': ['#AnimeNews', '#BreakingNews'],
        'Character Quotes': ['#AnimeQuotes', '#Motivation'],
        'Would You Rather': ['#WouldYouRather', '#GameTime'],
        'Mini Quiz': ['#AnimeQuiz', '#Trivia']
    };
    
    const selectedTypeHashtags = typeHashtags[postType] || ['#Anime', '#Fun'];
    const allHashtags = [...animeHashtags, ...selectedTypeHashtags, '#AnimeIndia'];
    
    // Randomly select 4-5 hashtags
    const shuffled = allHashtags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).join(' ');
}

// Generate different types of anime posts
async function generateEpisodeSummary() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const episode = getRandomItem(animeDatabase[anime].episodes);
    
    const emojis = anime === 'doraemon' ? ['🤖', '🔮', '🎯', '⭐'] : ['😂', '🤪', '👶', '🏠'];
    const selectedEmojis = [getRandomItem(emojis), getRandomItem(emojis.filter(e => e !== emojis[0]))];
    
    const hinglishPhrases = [
        'abey yaar', 'kya baat hai', 'ekdum mast', 'bilkul sahi', 'too good yaar', 
        'maja aa gaya', 'kya scene hai', 'epic episode', 'must watch hai'
    ];
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    const phrase = getRandomItem(hinglishPhrases);
    
    const hashtags = getHashtags(anime, 'Episode Summary');
    
    const text = `*${escapeMarkdownV2(episode.title)}* ${selectedEmojis[0]}

_Episode ${escapeMarkdownV2(episode.number.toString())} \\- ${escapeMarkdownV2(animeName)}_

> "${escapeMarkdownV2(episode.summary)}"

${phrase} ${selectedEmojis[1]} Ye episode toh must\\-watch hai\\! 

_Comment your fav scene below\\!_ 💭

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `<b>${episode.title}</b> ${selectedEmojis[0]}

<i>Episode ${episode.number} - ${animeName}</i>

"${episode.summary}"

${phrase} ${selectedEmojis[1]} Ye episode toh must-watch hai! 

<i>Comment your fav scene below!</i> 💭

${hashtags}`;

    // Generate AI image for this episode
    const imagePrompt = `${animeName} episode scene: ${episode.summary}. Characters in action, vibrant colors.`;
    const imagePath = path.join(imagesDir, `episode_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);
    
    return {
        type: 'Episode Summary',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `episode_${anime}_${episode.number}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'episode', episode.title) : null
    };
}

async function generateTrivia() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    // Try to generate custom AI trivia, fallback to database
    let trivia = await generateCustomTrivia(animeName);
    if (!trivia) {
        trivia = getRandomItem(animeDatabase[anime].trivia);
    }
    
    const emojis = ['🧠', '🤔', '💡', '🎯', '🔥', '✨'];
    const selectedEmoji = getRandomItem(emojis);
    
    const hashtags = getHashtags(anime, 'Trivia');
    
    const text = `🧩 *${escapeMarkdownV2(animeName)} Trivia Time\\!* ${selectedEmoji}

${escapeMarkdownV2(trivia.question)}

A\\) ${escapeMarkdownV2(trivia.options[0])}
B\\) ${escapeMarkdownV2(trivia.options[1])}
C\\) ${escapeMarkdownV2(trivia.options[2])}

_Answer batao comments mein\\!_ 🤓
_Pata hai toh like karo\\!_ ❤️

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `🧩 <b>${animeName} Trivia Time!</b> ${selectedEmoji}

${trivia.question}

A) ${trivia.options[0]}
B) ${trivia.options[1]}
C) ${trivia.options[2]}

<i>Answer batao comments mein!</i> 🤓
<i>Pata hai toh like karo!</i> ❤️

${hashtags}`;

    // Generate AI image for trivia
    const imagePrompt = `${animeName} characters thinking, quiz time, question marks, bright educational scene`;
    const imagePath = path.join(imagesDir, `trivia_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Trivia',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `trivia_${anime}_${trivia.question.substring(0, 30)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'trivia', trivia.question) : null
    };
}

async function generateTodayInHistory() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const fact = getRandomItem(animeDatabase[anime].todayInHistory);
    
    const emojis = ['📅', '🎂', '⏰', '📺', '🎉'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Today in History');
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(animeName)} Today in History\\!*

_${escapeMarkdownV2(formatDate())}_ 

${escapeMarkdownV2(fact.content)}

Kaafi interesting na\\? ${getRandomItem(['🤩', '😍', '🔥'])} 

_Share karo dosto ke saath\\!_ 📤

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>${animeName} Today in History!</b>

<i>${formatDate()}</i> 

${fact.content}

Kaafi interesting na? ${getRandomItem(['🤩', '😍', '🔥'])} 

<i>Share karo dosto ke saath!</i> 📤

${hashtags}`;

    // Generate AI image for history fact
    const imagePrompt = `${animeName} historical moment, vintage style, celebrating anniversary, nostalgic scene`;
    const imagePath = path.join(imagesDir, `history_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Today in History',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `history_${anime}_${fact.content.substring(0, 30)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'history', fact.content) : null
    };
}

async function generatePoll() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const poll = getRandomItem(animeDatabase[anime].polls);
    
    const emojis = ['📊', '🗳️', '👆', '🎯'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Poll');
    
    const text = `${selectedEmoji} *Poll Time\\!* 

${escapeMarkdownV2(poll.question)}

${poll.options.map((option, index) => 
    `${index + 1}\\) ${escapeMarkdownV2(option)}`
).join('\n')}

_Vote karo abhi\\!_ 🚀
_Tumhara choice kya hai\\?_ 🤔

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>Poll Time!</b> 

${poll.question}

${poll.options.map((option, index) => 
    `${index + 1}) ${option}`
).join('\n')}

<i>Vote karo abhi!</i> 🚀
<i>Tumhara choice kya hai?</i> 🤔

${hashtags}`;

    // Generate AI image for poll
    const imagePrompt = `${animeName} characters voting, democracy, multiple choices, fun interactive scene`;
    const imagePath = path.join(imagesDir, `poll_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Poll',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `poll_${anime}_${poll.question.substring(0, 30)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'poll', poll.question) : null
    };
}

// Generate anime facts posts
async function generateAnimeFacts() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const fact = getRandomItem(animeDatabase[anime].facts);
    
    const emojis = ['💡', '🤯', '📚', '🔍', '✨', '🎯'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Anime Facts');
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(fact.title)}*

${escapeMarkdownV2(fact.content)}

Mind\\-blown na\\? ${getRandomItem(['🤯', '😱', '🔥'])} 

_Share this amazing fact\\!_ 📤

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>${fact.title}</b>

${fact.content}

Mind-blown na? ${getRandomItem(['🤯', '😱', '🔥'])} 

<i>Share this amazing fact!</i> 📤

${hashtags}`;

    // Generate AI image for facts
    const imagePrompt = `${animeName} characters discovering amazing facts, educational scene, light bulb moment, knowledge sharing`;
    const imagePath = path.join(imagesDir, `facts_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Anime Facts',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `facts_${anime}_${fact.title.substring(0, 30)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'facts', fact.title) : null
    };
}

// Generate anime stories posts
async function generateAnimeStories() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const story = getRandomItem(animeDatabase[anime].stories);
    
    const emojis = ['📖', '🎭', '💫', '🌟', '🎪', '📝'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Anime Stories');
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(animeName)} Story Time\\!*

*${escapeMarkdownV2(story.title)}*

${escapeMarkdownV2(story.content)}

Kya interesting story hai na\\? ${getRandomItem(['😍', '🥺', '💕'])} 

_Tag your anime\\-loving friends\\!_ 👥

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>${animeName} Story Time!</b>

<b>${story.title}</b>

${story.content}

Kya interesting story hai na? ${getRandomItem(['😍', '🥺', '💕'])} 

<i>Tag your anime-loving friends!</i> 👥

${hashtags}`;

    // Generate AI image for stories
    const imagePrompt = `${animeName} characters in storytelling scene, emotional moment, flashback style, nostalgic atmosphere`;
    const imagePath = path.join(imagesDir, `stories_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Anime Stories',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `stories_${anime}_${story.title.substring(0, 30)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'story', story.title) : null
    };
}

// Generate anime news posts
async function generateAnimeNews() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const news = getRandomItem(animeDatabase[anime].news);
    
    const emojis = ['📰', '🔥', '⚡', '🚨', '📺', '🎬'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Anime News');
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(animeName)} News Alert\\!*

*${escapeMarkdownV2(news.title)}*

${escapeMarkdownV2(news.content)}

Kitna exciting hai yaar\\! ${getRandomItem(['🎉', '🔥', '🚀'])} 

_Stay tuned for more updates\\!_ 📡

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>${animeName} News Alert!</b>

<b>${news.title}</b>

${news.content}

Kitna exciting hai yaar! ${getRandomItem(['🎉', '🔥', '🚀'])} 

<i>Stay tuned for more updates!</i> 📡

${hashtags}`;

    // Generate AI image for news
    const imagePrompt = `${animeName} characters reading news, exciting announcement, celebration scene, modern news broadcast style`;
    const imagePath = path.join(imagesDir, `news_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Anime News',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `news_${anime}_${news.title.substring(0, 30)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'news', news.title) : null
    };
}

// Generate character quotes posts
async function generateCharacterQuotes() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const quote = getRandomItem(animeDatabase[anime].quotes);
    
    const emojis = ['💬', '🗣️', '💭', '✨', '🌟', '🎯'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Character Quotes');
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(animeName)} Quote of the Day\\!*

_"${escapeMarkdownV2(quote.quote)}"_

\\- ${escapeMarkdownV2(quote.character)} 

_${escapeMarkdownV2(quote.context)}_

Kitna relatable hai na\\? ${getRandomItem(['😂', '🥺', '💯'])} 

_Share with friends who need this\\!_ 🔥

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>${animeName} Quote of the Day!</b>

<i>"${quote.quote}"</i>

- ${quote.character} 

<i>${quote.context}</i>

Kitna relatable hai na? ${getRandomItem(['😂', '🥺', '💯'])} 

<i>Share with friends who need this!</i> 🔥

${hashtags}`;

    // Generate AI image for quotes
    const imagePrompt = `${quote.character} from ${animeName} giving wise advice, inspirational scene, motivational poster style`;
    const imagePath = path.join(imagesDir, `quotes_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Character Quotes',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `quotes_${anime}_${quote.character}_${quote.quote.substring(0, 20)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'quotes', quote.quote) : null
    };
}

// Generate Would You Rather posts
async function generateWouldYouRather() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const scenario = getRandomItem(animeDatabase[anime].wouldYouRather);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Would You Rather');
    
    const text = `🤔 *Would You Rather\\?* ${scenario.emoji}

*Option A:* ${escapeMarkdownV2(scenario.optionA)}

*VS*

*Option B:* ${escapeMarkdownV2(scenario.optionB)}

Tum kya choose karoge\\? 🤷‍♂️

_Comment mein batao\\: A ya B\\?_ 👇
_Tag your friends\\!_ 🔥

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `🤔 <b>Would You Rather?</b> ${scenario.emoji}

<b>Option A:</b> ${scenario.optionA}

<b>VS</b>

<b>Option B:</b> ${scenario.optionB}

Tum kya choose karoge? 🤷‍♂️

<i>Comment mein batao: A ya B?</i> 👇
<i>Tag your friends!</i> 🔥

${hashtags}`;

    // Generate AI image for would you rather
    const imagePrompt = `${animeName} characters making tough choices, decision time, vs battle style, fun dilemma`;
    const imagePath = path.join(imagesDir, `wyr_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Would You Rather',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `wyr_${anime}_${scenario.optionA.substring(0, 20)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'would you rather', scenario.optionA) : null
    };
}

// Generate Mini Quiz posts
async function generateMiniQuiz() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const quiz = getRandomItem(animeDatabase[anime].miniQuiz);
    
    const emojis = ['🎓', '🧠', '❓', '🎯', '💡'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const hashtags = getHashtags(anime, 'Mini Quiz');
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(animeName)} Mini Quiz\\!*

*Q:* ${escapeMarkdownV2(quiz.question)}

_Think karo aur answer batao comments mein\\!_ 🤓

||Spoiler Alert\\!|| 
_Answer:_ ||${escapeMarkdownV2(quiz.answer)}||

*Fun Fact:* ${escapeMarkdownV2(quiz.funFact)}

Mind\\-blown\\? ${getRandomItem(['🤯', '😱', '🔥'])} 

_Share karo sabke saath\\!_ 📤

${escapeMarkdownV2(hashtags)}`;

    const textHTML = `${selectedEmoji} <b>${animeName} Mini Quiz!</b>

<b>Q:</b> ${quiz.question}

<i>Think karo aur answer batao comments mein!</i> 🤓

<spoiler>Spoiler Alert!</spoiler> 
<i>Answer:</i> <spoiler>${quiz.answer}</spoiler>

<b>Fun Fact:</b> ${quiz.funFact}

Mind-blown? ${getRandomItem(['🤯', '😱', '🔥'])} 

<i>Share karo sabke saath!</i> 📤

${hashtags}`;

    // Generate AI image for quiz
    const imagePrompt = `${animeName} characters in quiz show, game show style, thinking hard, educational fun`;
    const imagePath = path.join(imagesDir, `quiz_${Date.now()}.png`);
    const generatedImage = await generateAnimeImage(imagePrompt, animeName, imagePath);

    return {
        type: 'Mini Quiz',
        text: text,
        textHTML: textHTML,
        anime: anime,
        contentKey: `quiz_${anime}_${quiz.question.substring(0, 20)}`,
        imagePath: generatedImage,
        imageCaption: generatedImage ? await generateImageCaption(animeName, 'quiz', quiz.question) : null
    };
}

// Smart selection - tries to generate unique content not recently posted
async function generateAnimePost() {
    const postTypes = [
        generateEpisodeSummary,
        generateTrivia,
        generateTodayInHistory,
        generatePoll,
        generateAnimeFacts,
        generateAnimeStories,
        generateAnimeNews,
        generateCharacterQuotes,
        generateWouldYouRather,
        generateMiniQuiz
    ];
    
    const maxAttempts = 10;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        const randomGenerator = getRandomItem(postTypes);
        const post = await randomGenerator();
        
        // Check if this content was recently posted
        if (!wasRecentlyPosted(post.contentKey)) {
            console.log(`✨ Found unique content on attempt ${attempts + 1}`);
            return post;
        }
        
        console.log(`⚠️ Content already posted recently, trying again... (attempt ${attempts + 1})`);
        attempts++;
    }
    
    // If all attempts fail, just return the last generated post
    console.log('⚠️ Could not find unique content after 10 attempts, posting anyway');
    const fallbackGenerator = getRandomItem(postTypes);
    return await fallbackGenerator();
}

module.exports = {
    generateAnimePost,
    generateEpisodeSummary,
    generateTrivia,
    generateTodayInHistory,
    generatePoll,
    generateAnimeFacts,
    generateAnimeStories,
    generateAnimeNews,
    generateCharacterQuotes,
    generateWouldYouRather,
    generateMiniQuiz,
    escapeMarkdownV2
};