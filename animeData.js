// Anime content database for Doraemon and Shinchan

const animeDatabase = {
    doraemon: {
        episodes: [
            {
                number: 1,
                title: "Doraemon's Time Machine Adventure",
                summary: "Nobita uses Doraemon's time machine but ends up in the wrong era... again! 😅"
            },
            {
                number: 15,
                title: "The Magic Door",
                summary: "Anywhere Door takes them to the wrong place and chaos follows!"
            },
            {
                number: 23,
                title: "Gian's Concert Disaster",
                summary: "Gian's singing is so bad that even Doraemon's gadgets can't help 🎤💀"
            },
            {
                number: 45,
                title: "Nobita's Test Troubles",
                summary: "Memory bread backfires spectacularly during exam time!"
            },
            {
                number: 67,
                title: "Shizuka's Birthday Party",
                summary: "Nobita tries to impress Shizuka but everything goes wrong as usual"
            },
            {
                number: 89,
                title: "The Invisible Cloak Mystery",
                summary: "When the invisible cloak goes missing, hilarious chaos ensues!"
            }
        ],
        trivia: [
            {
                question: "What is Doraemon's favorite food?",
                options: ["Dorayaki", "Ice Cream", "Ramen"],
                answer: "Dorayaki"
            },
            {
                question: "Where does Doraemon come from?",
                options: ["21st Century", "22nd Century", "23rd Century"],
                answer: "22nd Century"
            },
            {
                question: "What is Nobita's biggest fear?",
                options: ["Ghosts", "Exams", "Gian's singing"],
                answer: "Gian's singing"
            },
            {
                question: "Which gadget can take you anywhere instantly?",
                options: ["Anywhere Door", "Bamboo Copter", "Time Machine"],
                answer: "Anywhere Door"
            }
        ],
        todayInHistory: [
            {
                content: "Did you know? Doraemon first appeared in manga in 1969! Almost 55+ years of pure entertainment! 🎂"
            },
            {
                content: "Fun fact: Doraemon was originally yellow before getting his ears bitten off by mice! 🐭"
            },
            {
                content: "Trivia: The Anywhere Door was inspired by the creator's wish to travel anywhere instantly! ✈️"
            },
            {
                content: "Amazing fact: Doraemon has over 1000+ different gadgets in his 4D pocket! 🎒"
            }
        ],
        polls: [
            {
                question: "Best Doraemon gadget ever?",
                options: ["Anywhere Door", "Bamboo Copter", "Time Machine", "Take-copter"]
            },
            {
                question: "Who's the funniest character?",
                options: ["Nobita", "Gian", "Suneo", "Doraemon"]
            },
            {
                question: "Most useful gadget for students?",
                options: ["Memory Bread", "Copying Toast", "Translation Tool", "Study Helper"]
            }
        ],
        facts: [
            {
                title: "Doraemon's Real Name Mystery",
                content: "Did you know Doraemon's full name is actually MS-903? But everyone calls him Doraemon! Kitty robots were super popular in 22nd century! 🤖"
            },
            {
                title: "The Secret of 4D Pocket",
                content: "Doraemon's 4D pocket connects to a parallel dimension where all gadgets are stored! It's basically infinite storage space! 🌌"
            },
            {
                title: "Nobita's Hidden Talent",
                content: "Nobita is actually a master at cat's cradle and sleeping anywhere! He can fall asleep in 0.93 seconds - that's a world record! 😴"
            },
            {
                title: "Gian's Secret Dream",
                content: "Despite being a bully, Gian secretly dreams of becoming a famous singer! His heart of gold shows when he helps friends! 🎤❤️"
            }
        ],
        stories: [
            {
                title: "How Doraemon Lost His Ears",
                content: "Back in 2112, baby Doraemon was yellow and had ears! But robot mice ate his ears while he was sleeping, turning him blue from shock! That's why he's afraid of mice! 🐭💙"
            },
            {
                title: "Nobita's Future Family",
                content: "In the future, Nobita marries Shizuka and they have a son named Nobisuke! Their family becomes very happy and successful thanks to lessons learned! 👨‍👩‍👦"
            },
            {
                title: "The Origin of Anywhere Door",
                content: "Fujiko Sensei created Anywhere Door because he was tired of crowded trains in Tokyo! He wished for instant travel - and made it a reality in anime! 🚪✨"
            }
        ],
        news: [
            {
                title: "Doraemon Movie 2024 Update",
                content: "New Doraemon movie broke box office records in Japan! 'Nobita's Earth Symphony' earned over 11 billion yen! Fans are going crazy! 🎬💰"
            },
            {
                title: "Anniversary Celebration",
                content: "2024 marks 55 years of Doraemon manga! Special exhibitions happening across Japan with rare artwork and original sketches! 🎂🎨"
            },
            {
                title: "Real-Life Doraemon Tech",
                content: "Scientists in Japan created a working 'translation device' inspired by Doraemon's Translator Tool! Technology is catching up to anime! 🔬🌐"
            }
        ],
        quotes: [
            {
                character: "Doraemon",
                quote: "Nobita, you can't depend on gadgets forever. Sometimes you have to believe in yourself!",
                context: "Life lesson"
            },
            {
                character: "Nobita",
                quote: "I'll definitely study... tomorrow!",
                context: "Classic Nobita excuse"
            },
            {
                character: "Shizuka",
                quote: "If you work hard, you can achieve anything Nobita!",
                context: "Encouraging words"
            },
            {
                character: "Gian",
                quote: "What's mine is mine, what's yours is also mine!",
                context: "Gian logic"
            },
            {
                character: "Suneo",
                quote: "My dad bought me the latest gadget from America!",
                context: "Showing off"
            },
            {
                character: "Doraemon",
                quote: "Dorayaki is the best food in the world!",
                context: "Doraemon's passion"
            },
            {
                character: "Nobita's Mom",
                quote: "Nobita! Stop sleeping and do your homework!",
                context: "Mom being mom"
            }
        ],
        wouldYouRather: [
            {
                optionA: "Have Anywhere Door for life",
                optionB: "Have Bamboo Copter forever",
                emoji: "🚪 vs 🚁"
            },
            {
                optionA: "Eat Memory Bread before every exam",
                optionB: "Use Time Machine to go back and study",
                emoji: "🍞 vs ⏰"
            },
            {
                optionA: "Be friends with Doraemon",
                optionB: "Be friends with Nobita",
                emoji: "🤖 vs 👦"
            },
            {
                optionA: "Have Gian as neighbor",
                optionB: "Have Suneo as neighbor",
                emoji: "💪 vs 💰"
            }
        ],
        miniQuiz: [
            {
                question: "How many dorayaki can Doraemon eat in one sitting?",
                answer: "As many as possible! He loves them!",
                funFact: "Doraemon once ate 100+ dorayaki in the movie!"
            },
            {
                question: "What happens when Nobita sleeps during the day?",
                answer: "He gets scolded by Mom!",
                funFact: "Nobita can fall asleep in 0.93 seconds - world record!"
            },
            {
                question: "Why is Doraemon blue and not yellow?",
                answer: "Mice ate his ears and shock turned him blue!",
                funFact: "Originally Doraemon was designed to be yellow and cute!"
            }
        ]
    },
    
    shinchan: {
        episodes: [
            {
                number: 12,
                title: "Shinchan's Grocery Shopping Disaster",
                summary: "Mom sends Shinchan to buy groceries... he comes back with toys and chaos! 🛒"
            },
            {
                number: 34,
                title: "Action Kamen vs Shinchan",
                summary: "Shinchan thinks he's Action Kamen and tries to 'save' everyone in the neighborhood"
            },
            {
                number: 56,
                title: "Kindergarten Sports Day",
                summary: "Shinchan's antics during sports day leave everyone speechless... and laughing! 🏃‍♂️"
            },
            {
                number: 78,
                title: "Dad's Weekend Plans Ruined",
                summary: "Hiroshi's peaceful weekend turns into Shinchan's adventure playground"
            },
            {
                number: 91,
                title: "Shinchan Becomes a Teacher",
                summary: "When Shinchan 'teaches' other kids, the results are hilariously disastrous!"
            },
            {
                number: 103,
                title: "The Great Butt Dance Competition",
                summary: "Shinchan's signature butt dance causes mayhem at the local festival 🍑💃"
            }
        ],
        trivia: [
            {
                question: "What is Shinchan's favorite superhero?",
                options: ["Action Kamen", "Ultra Man", "Kamen Rider"],
                answer: "Action Kamen"
            },
            {
                question: "What's Shinchan's dog's name?",
                options: ["Shiro", "Kuro", "Hachi"],
                answer: "Shiro"
            },
            {
                question: "Who is Shinchan's kindergarten teacher?",
                options: ["Yoshinaga-sensei", "Matsuzaka-sensei", "Ageo-sensei"],
                answer: "Yoshinaga-sensei"
            },
            {
                question: "What's Shinchan's famous dance move?",
                options: ["Butt Dance", "Robot Dance", "Moonwalk"],
                answer: "Butt Dance"
            }
        ],
        todayInHistory: [
            {
                content: "Did you know? Crayon Shin-chan started as a manga in 1990! 30+ years of non-stop laughter! 😂"
            },
            {
                content: "Fun fact: Shinchan's famous butt dance was inspired by real kindergarten kids! 🍑"
            },
            {
                content: "Trivia: Action Kamen was created specifically for the Shinchan universe! 🦸‍♂️"
            },
            {
                content: "Amazing fact: Shinchan is only 5 years old but his humor appeals to all ages! 👶"
            }
        ],
        polls: [
            {
                question: "Funniest Shinchan moment ever?",
                options: ["Butt Dance", "Grocery Shopping", "Action Kamen Play", "Teacher Impression"]
            },
            {
                question: "Best Shinchan character?",
                options: ["Shinchan", "Himawari", "Misae", "Hiroshi"]
            },
            {
                question: "Most relatable Shinchan parent?",
                options: ["Misae (Mom)", "Hiroshi (Dad)", "Both equally", "Neither 😅"]
            }
        ],
        facts: [
            {
                title: "Shinchan's Real Age Mystery",
                content: "Shinchan has been 5 years old for over 30 years! He's the eternal kindergarten kid who never grows up! Time works differently in anime! ⏰👶"
            },
            {
                title: "Action Kamen's Secret Identity",
                content: "Action Kamen is actually based on Kamen Rider! Creator added the cape and mask to make it unique for Shinchan's world! 🦸‍♂️"
            },
            {
                title: "Shiro the Super Dog",
                content: "Shiro is a cotton de tulear breed! He's incredibly smart and loyal, often saving the Nohara family from crazy situations! 🐕‍🦺"
            },
            {
                title: "Himawari's Flower Power",
                content: "Baby Himawari is named after sunflowers! She loves shiny things and has superhuman strength when she wants something! 🌻💪"
            }
        ],
        stories: [
            {
                title: "How Shinchan Got His Name",
                content: "Shin-chan's real name is Shinnosuke Nohara! 'Shin' means 'new' and he brings new chaos everywhere he goes! His nickname perfectly fits his personality! 😄"
            },
            {
                title: "The Nohara Family Origins",
                content: "Hiroshi and Misae met at work and fell in love! They moved to Kasukabe for a peaceful life but got the most un-peaceful kid ever! 😅💕"
            },
            {
                title: "Shinchan's Dance Legacy",
                content: "The famous butt dance was inspired by real kids the creator observed! It became so popular that kids worldwide copy it! 🍑💃"
            }
        ],
        news: [
            {
                title: "Shinchan Movie 2024 Success",
                content: "Latest Shinchan movie 'Mononoke Ninja Chinpuden' is a huge hit! Fans love the ninja adventure theme with classic Shinchan humor! 🥷🎬"
            },
            {
                title: "Global Shinchan Popularity",
                content: "Shinchan anime now streams in 50+ countries! International fans are learning Japanese phrases from the show! 🌍📺"
            },
            {
                title: "Kasukabe City Tourism Boom",
                content: "Shinchan's hometown Kasukabe gets 1 million tourists yearly! They built a Shinchan statue and themed attractions! 🏙️🗿"
            }
        ],
        quotes: [
            {
                character: "Shinchan",
                quote: "Ohhh! Action Kamen is here to save the day!",
                context: "Playing superhero"
            },
            {
                character: "Misae (Mom)",
                quote: "SHINNN-CHANNNN! Stop causing trouble!",
                context: "Classic mom rage"
            },
            {
                character: "Hiroshi (Dad)",
                quote: "All I want is a peaceful weekend...",
                context: "Dad's dream"
            },
            {
                character: "Shinchan",
                quote: "Elephant! Elephant! Do the elephant dance!",
                context: "Being himself"
            },
            {
                character: "Himawari",
                quote: "Dai! Dai! (Shiny!)",
                context: "Baby wanting sparkly things"
            },
            {
                character: "Shinchan",
                quote: "Pretty ladies are everywhere!",
                context: "Shinchan logic"
            },
            {
                character: "Yoshinaga-sensei",
                quote: "Shin-chan, please behave in class!",
                context: "Teacher's struggle"
            }
        ],
        wouldYouRather: [
            {
                optionA: "Do Shinchan's butt dance in public",
                optionB: "Sing like Gian in front of everyone",
                emoji: "🍑 vs 🎤"
            },
            {
                optionA: "Have Shinchan as your kid",
                optionB: "Have Nobita as your kid",
                emoji: "👶 vs 🧒"
            },
            {
                optionA: "Live with Nohara family chaos",
                optionB: "Deal with Nobita's lazy habits",
                emoji: "🏠 vs 😴"
            },
            {
                optionA: "Be Action Kamen for a day",
                optionB: "Have all Doraemon's gadgets",
                emoji: "🦸 vs 🎒"
            }
        ],
        miniQuiz: [
            {
                question: "What's Shinchan's favorite superhero?",
                answer: "Action Kamen of course!",
                funFact: "Shinchan has complete Action Kamen merchandise collection!"
            },
            {
                question: "Why does Shinchan call his dad 'Hiroshi' sometimes?",
                answer: "Because he's a cheeky kid!",
                funFact: "This shows Shinchan's unique disrespectful but lovable personality!"
            },
            {
                question: "What does Himawari love the most?",
                answer: "Shiny sparkly things!",
                funFact: "She has superhuman strength when grabbing shiny objects!"
            }
        ]
    }
};

// Helper functions
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function formatDate() {
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return today.toLocaleDateString('en-US', options);
}

module.exports = {
    animeDatabase,
    getRandomItem,
    formatDate
};