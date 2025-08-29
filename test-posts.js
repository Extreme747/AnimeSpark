// Test script to generate and preview posts without sending to Telegram
const { generateAnimePost, generateEpisodeSummary, generateTrivia, generateTodayInHistory, generatePoll } = require('./postGenerator');

console.log('🎯 Anime Post Generator Test\n');
console.log('='.repeat(50));

// Generate different types of posts
const postTypes = [
    { name: 'Episode Summary', generator: generateEpisodeSummary },
    { name: 'Trivia', generator: generateTrivia },
    { name: 'Today in History', generator: generateTodayInHistory },
    { name: 'Poll', generator: generatePoll }
];

postTypes.forEach((postType, index) => {
    console.log(`\n${index + 1}. ${postType.name.toUpperCase()}`);
    console.log('-'.repeat(30));
    
    const post = postType.generator();
    console.log('MarkdownV2 Format:');
    console.log(post.text);
    console.log('\nHTML Format:');
    console.log(post.textHTML);
    console.log('\n' + '='.repeat(50));
});

// Generate random post
console.log('\n🎲 RANDOM POST');
console.log('-'.repeat(30));
const randomPost = generateAnimePost();
console.log(`Type: ${randomPost.type}`);
console.log(`Anime: ${randomPost.anime}`);
console.log('\nContent:');
console.log(randomPost.text);