// Expanded Anime Database - All Popular Anime + News/Trends

const expandedAnimeDatabase = {
    // Existing anime (limited to 3-4 posts per day)
    doraemon: { daily_limit: 2 },
    shinchan: { daily_limit: 2 },
    
    // Popular Anime Series for Regular News & Updates
    onepiece: {
        title: "One Piece",
        latest_news: [
            "🏴‍☠️ New Straw Hat member joining soon? Latest chapter hints revealed!",
            "⚔️ Epic fight scenes in latest episode - fans going crazy! 🔥",
            "📈 One Piece surpasses 500M copies sold worldwide! 🎊",
            "💔 Emotional backstory revealed for fan-favorite character",
            "🗺️ New island arc announced - adventure incoming! 🌊"
        ],
        updates: [
            "Episode released this week with major plot twist!",
            "Manga chapter brings shocking revelation!",
            "Anime adaptation reaching peak quality!",
            "Characters development at new heights!",
            "Filler arc ending soon - main story returns!"
        ]
    },
    
    naruto: {
        title: "Naruto/Boruto",
        latest_news: [
            "🍃 Boruto's new power awakening! Fans discussing theories 🔥",
            "⚡ Sasuke returns with shocking power reveal!",
            "👁️ Sharingan evolution concepts revealed!",
            "🌙 Naruto and Sasuke team-up in latest chapter!",
            "🔥 Jutsu combinations breaking the internet!"
        ],
        updates: [
            "Boruto anime hitting new heights!",
            "Manga reveals hidden village secrets!",
            "Character power scaling discussions intense!",
            "Fans creating amazing fan theories!",
            "Upcoming movie announcement expected soon!"
        ]
    },
    
    dragonball: {
        title: "Dragon Ball",
        latest_news: [
            "🔥 New Ultra transformation hinted at! 💪",
            "⚡ Goku vs Vegeta rematch incoming!",
            "🌟 Super Saiyan concepts pushed to limits!",
            "💥 Martial Arts Tournament hype building!",
            "🎊 New movie breaking box office records!"
        ],
        updates: [
            "Dragon Ball Super manga returning!",
            "Latest fight scene animation perfection!",
            "Tournament arc getting insane!",
            "Character comebacks thrilling fans!",
            "Tournament brackets revealed!"
        ]
    },
    
    attackontitan: {
        title: "Attack on Titan",
        latest_news: [
            "🧛 Shocking titan revelations in final season! 😱",
            "⚔️ Epic battles redefining anime standards!",
            "🔮 Mysteries finally getting answers!",
            "💔 Emotional character arcs concluding!",
            "🎬 Series finale getting rave reviews!"
        ],
        updates: [
            "Final season part explosive as expected!",
            "Plot twists nobody saw coming!",
            "Animation quality at peak!",
            "Fan theories being confirmed!",
            "Series legacy solidified forever!"
        ]
    },
    
    jujutsu: {
        title: "Jujutsu Kaisen",
        latest_news: [
            "🩸 New cursed techniques showcased!",
            "💀 Major character sacrifice shocks fans!",
            "🔴 Domains expanding with new concepts!",
            "⚫ Black flash moments incredible!",
            "🌪️ Culling Games bringing insane fights!"
        ],
        updates: [
            "Anime Season 2 exceeding expectations!",
            "Manga introducing complex power systems!",
            "Character development story reaching peak!",
            "Fight choreography absolutely stunning!",
            "Fanbase growing exponentially!"
        ]
    },
    
    demonslayer: {
        title: "Demon Slayer",
        latest_news: [
            "⚔️ Breathing techniques evolution shown!",
            "👹 Demon King arc escalating rapidly!",
            "🔥 Animation studio breaking records!",
            "💥 Sword techniques perfected!",
            "🌙 Final arc predictions running wild!"
        ],
        updates: [
            "New movie announcement incoming!",
            "Anime visual quality unmatched!",
            "Manga arc intensity increasing!",
            "Character bonds deepening!",
            "Fanbase creating amazing content!"
        ]
    },
    
    tokyoghoul: {
        title: "Tokyo Ghoul",
        latest_news: [
            "👹 Kagune powers reaching peak!",
            "🔴 Ghoul society structures revealed!",
            "⚫ Dark storylines continuing!",
            "💀 Character fates shocking!",
            "🌃 Tokyo setting becoming iconic!"
        ],
        updates: [
            "Re:anime bringing new fans!",
            "Manga lore incredibly deep!",
            "Character arcs emotionally complex!",
            "Community theories mind-blowing!",
            "Series impact on anime industry huge!"
        ]
    },
    
    myheroacademia: {
        title: "My Hero Academia",
        latest_news: [
            "🦸 Quirk training reaching new levels!",
            "⚡ Hero vs Villain wars intensifying!",
            "🔥 Deku's power awakening continues!",
            "💪 Class A students leveling up!",
            "🏫 School tournament exciting fans!"
        ],
        updates: [
            "Anime Season bringing major battles!",
            "Manga reveals shocking abilities!",
            "Character friendships tested!",
            "Power scaling discussions heated!",
            "Fanbase passionate and growing!"
        ]
    },
    
    steinsgate: {
        title: "Steins;Gate",
        latest_news: [
            "⏰ Time travel concepts mind-bending!",
            "🔬 Science theories explained!",
            "📱 Microwave mysteries solved!",
            "🌀 Worldlines creating paradoxes!",
            "💭 Plot twists absolutely brilliant!"
        ],
        updates: [
            "Re-watch discussions happening!",
            "Fan theories complex and fascinating!",
            "Sequel potential debated!",
            "Science accuracy appreciated!",
            "Community analysis detailed!"
        ]
    },
    
    codgeass: {
        title: "Code Geass",
        latest_news: [
            "👑 Lelouch's strategies legendary!",
            "🤖 Mecha battles intense!",
            "💜 Power of Code explained!",
            "🎭 Mind games incredible!",
            "⚪ Ending theories discussed!"
        ],
        updates: [
            "Anime praised for originality!",
            "Strategic plot elements admired!",
            "Character development complex!",
            "Community still active!",
            "Influence on anime significant!"
        ]
    },
    
    deathstorage: {
        title: "Death Storage",
        latest_news: [
            "📓 Notebook power mechanics!",
            "⚫ Shinigami lore expanding!",
            "🔴 Strategic battles intense!",
            "💀 Psychological themes deep!",
            "🎯 Mind battles incredible!"
        ],
        updates: [
            "Series brilliance still recognized!",
            "Fan theories intricate!",
            "Character psychology discussed!",
            "Plot complexity appreciated!",
            "Influence on thriller anime huge!"
        ]
    }
};

// Market trends and anime industry news
const industryTrends = [
    "📺 Streaming wars intensifying - new anime exclusive deals!",
    "🎬 Anime movies breaking box office records globally!",
    "🌍 International anime fandom reaching new heights!",
    "💰 Anime industry revenue surpassing 2.7 trillion yen!",
    "🎨 AI-assisted animation techniques emerging!",
    "📱 Mobile anime games becoming mainstream!",
    "🎪 Anime conventions returning with record attendance!",
    "👕 Anime merchandise sales explosive!",
    "🌐 Global anime collaborations increasing!",
    "🎵 Anime music festivals gaining popularity!",
    "🤝 Collaborations between anime studios trending!",
    "📊 Anime viewership statistics breaking records!",
    "🎬 New studio formations for quality animation!",
    "🏆 Anime awards recognizing diverse genres!",
    "💻 CGI anime improving quality dramatically!"
];

// Viral topics this week
const viralTopics = [
    "🔥 Hottest anime drops this season!",
    "⭐ Fan favorite moments going viral!",
    "🎨 Epic fan art inspiring community!",
    "💬 Shipping wars heating up online!",
    "🎵 Opening themes trending on social media!",
    "🌟 Voice actor surprises announced!",
    "🎭 Cosplay wins at conventions!",
    "📸 Behind-the-scenes studio footage released!",
    "🎬 Director interviews revealing secrets!",
    "💔 Emotional character moments discussed!",
    "🎯 Plot predictions trending!",
    "🌈 LGBTQ+ representation in anime!",
    "🎪 Convention announcements exciting fans!",
    "📚 Manga adaptations announced!",
    "🏅 Awards season bringing surprises!"
];

function getRandomAnime() {
    const animes = Object.keys(expandedAnimeDatabase).filter(key => key !== 'doraemon' && key !== 'shinchan');
    return animes[Math.floor(Math.random() * animes.length)];
}

function getRandomNews(anime) {
    const data = expandedAnimeDatabase[anime];
    const pool = [...(data.latest_news || []), ...(data.updates || [])];
    return pool[Math.floor(Math.random() * pool.length)];
}

function getRandomTrend() {
    return industryTrends[Math.floor(Math.random() * industryTrends.length)];
}

function getRandomViralTopic() {
    return viralTopics[Math.floor(Math.random() * viralTopics.length)];
}

module.exports = {
    expandedAnimeDatabase,
    getRandomAnime,
    getRandomNews,
    getRandomTrend,
    getRandomViralTopic,
    industryTrends,
    viralTopics
};
