const { animeDatabase, getRandomItem, formatDate } = require('./animeData');

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

// Generate different types of anime posts
function generateEpisodeSummary() {
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
    
    const text = `*${escapeMarkdownV2(episode.title)}* ${selectedEmojis[0]}

_Episode ${escapeMarkdownV2(episode.number.toString())} \\- ${escapeMarkdownV2(animeName)}_

> "${escapeMarkdownV2(episode.summary)}"

${phrase} ${selectedEmojis[1]} Ye episode toh must\\-watch hai\\! 

_Comment your fav scene below\\!_ 💭`;

    const textHTML = `<b>${episode.title}</b> ${selectedEmojis[0]}

<i>Episode ${episode.number} - ${animeName}</i>

"${episode.summary}"

${phrase} ${selectedEmojis[1]} Ye episode toh must-watch hai! 

<i>Comment your fav scene below!</i> 💭`;

    return {
        type: 'Episode Summary',
        text: text,
        textHTML: textHTML,
        anime: anime
    };
}

function generateTrivia() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const trivia = getRandomItem(animeDatabase[anime].trivia);
    
    const emojis = ['🧠', '🤔', '💡', '🎯', '🔥', '✨'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const text = `🧩 *${escapeMarkdownV2(animeName)} Trivia Time\\!* ${selectedEmoji}

${escapeMarkdownV2(trivia.question)}

A\\) ${escapeMarkdownV2(trivia.options[0])}
B\\) ${escapeMarkdownV2(trivia.options[1])}
C\\) ${escapeMarkdownV2(trivia.options[2])}

_Answer batao comments mein\\!_ 🤓
_Pata hai toh like karo\\!_ ❤️`;

    const textHTML = `🧩 <b>${animeName} Trivia Time!</b> ${selectedEmoji}

${trivia.question}

A) ${trivia.options[0]}
B) ${trivia.options[1]}
C) ${trivia.options[2]}

<i>Answer batao comments mein!</i> 🤓
<i>Pata hai toh like karo!</i> ❤️`;

    return {
        type: 'Trivia',
        text: text,
        textHTML: textHTML,
        anime: anime
    };
}

function generateTodayInHistory() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const fact = getRandomItem(animeDatabase[anime].todayInHistory);
    
    const emojis = ['📅', '🎂', '⏰', '📺', '🎉'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const text = `${selectedEmoji} *${escapeMarkdownV2(animeName)} Today in History\\!*

_${escapeMarkdownV2(formatDate())}_ 

${escapeMarkdownV2(fact.content)}

Kaafi interesting na\\? ${getRandomItem(['🤩', '😍', '🔥'])} 

_Share karo dosto ke saath\\!_ 📤`;

    const textHTML = `${selectedEmoji} <b>${animeName} Today in History!</b>

<i>${formatDate()}</i> 

${fact.content}

Kaafi interesting na? ${getRandomItem(['🤩', '😍', '🔥'])} 

<i>Share karo dosto ke saath!</i> 📤`;

    return {
        type: 'Today in History',
        text: text,
        textHTML: textHTML,
        anime: anime
    };
}

function generatePoll() {
    const anime = getRandomItem(['doraemon', 'shinchan']);
    const poll = getRandomItem(animeDatabase[anime].polls);
    
    const emojis = ['📊', '🗳️', '👆', '🎯'];
    const selectedEmoji = getRandomItem(emojis);
    
    const animeName = anime === 'doraemon' ? 'Doraemon' : 'Shinchan';
    
    const text = `${selectedEmoji} *Poll Time\\!* 

${escapeMarkdownV2(poll.question)}

${poll.options.map((option, index) => 
    `${index + 1}\\) ${escapeMarkdownV2(option)}`
).join('\n')}

_Vote karo abhi\\!_ 🚀
_Tumhara choice kya hai\\?_ 🤔`;

    const textHTML = `${selectedEmoji} <b>Poll Time!</b> 

${poll.question}

${poll.options.map((option, index) => 
    `${index + 1}) ${option}`
).join('\n')}

<i>Vote karo abhi!</i> 🚀
<i>Tumhara choice kya hai?</i> 🤔`;

    return {
        type: 'Poll',
        text: text,
        textHTML: textHTML,
        anime: anime
    };
}

// Main function to generate random anime posts
function generateAnimePost() {
    const postTypes = [
        generateEpisodeSummary,
        generateTrivia,
        generateTodayInHistory,
        generatePoll
    ];
    
    const randomGenerator = getRandomItem(postTypes);
    return randomGenerator();
}

module.exports = {
    generateAnimePost,
    generateEpisodeSummary,
    generateTrivia,
    generateTodayInHistory,
    generatePoll,
    escapeMarkdownV2
};