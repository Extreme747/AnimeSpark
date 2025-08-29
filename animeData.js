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