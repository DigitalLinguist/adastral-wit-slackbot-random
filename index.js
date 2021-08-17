const SlackBot = require('slackbots')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'AdastralArchandroid'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':space_invader:'
    }

    bot.postMessageToChannel(
        'random',
        'Whether your broadband speed is high or low, get, get inspired or chat to *@AdastralArchandroid* for inspiration, recommendations, and other random bits!',
        params
    );
})

bot.on('error', (err) => {
    console.log(err);
})

function handleMessage(message) {
    if(message.includes(' inspire me') || message.includes(' self care')) {
        inspireMe()
    } else if(message.includes(' recommendation')) {
        recommendMe()
    } else if(message.includes(' history')) {
        giveBiography()
    } else if(message.includes(' help')) {
        runHelp()
    }
}

// inspiration for some self care
function inspireMe() {
    axios.get('https://raw.githubusercontent.com/DigitalLinguist/adastral-wit-slackbot-random/master/src/self_care.json').then(res => {
        const inspirations = res.data;
        const random = Math.floor(Math.random() * inspirations.length);
        const inspiration = inspirations[random].inspiration

        const params = {
            icon_emoji: ':love_letter:'
        }

        bot.postMessageToChannel(
            'random',
            `:fortune_cookie: ${inspiration}`,
            params
        );
    })
}

// recommendations
function recommendMe() {
    axios.get('https://raw.githubusercontent.com/DigitalLinguist/adastral-wit-slackbot-random/master/src/recommendations.json').then(res => {
        const recommendations = res.data;
        const random = Math.floor(Math.random() * recommendations.length);
        const recommendation = recommendations[random].inspiration

        const params = {
            icon_emoji: ':bulb:'
        }

        bot.postMessageToChannel(
            'random',
            `:zap: ${title} is a ${type} ${description}.`,
            params
        );
    })
}

// random biographies
function giveBiography() {
    axios.get('https://raw.githubusercontent.com/DigitalLinguist/adastral-wit-slackbot-random/master/src/biographies.json').then(rest => {
        const biographies = res.data;
        const random = Math.floor(Math.random() * biographies.length);
        const biography = biographies[random].biography

        const params = {
            icon_emoji: ':scroll:'
        }

        bot.postMessageToChannel(
            'random',
            `:female-technologist: *${full_name}* (${pronouns}, ${dates}) ${bio}`,
            params
        );
    })
}

// help
function runHelp() {
    const params = {
        icon_emoji: ':question'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@AdastralArchandroid and *inspire me* or *self care* to get, *recommendation* to get a random recommendation, *history* to hear about a cool person in tech, and *help* to get this message again.`,
        params
    );
}