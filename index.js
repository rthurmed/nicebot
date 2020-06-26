const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config()

const actions = {
  READY: 'ready',
  MESSAGE: 'message'
}

const EXPRESSION = 'nice'
const REGEXP = /nice/g

let me
let nicemeter = 0

let trees = ''

client.on(actions.READY, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  me = client.user.username
});

const plant = () => {
  const seeds = ['🌴', '🌲', '🌳', '🌵', '🍀', '🌿', '🌷', '🌹', '🌾']
  const index = Math.floor((Math.random() * seeds.length))
  return seeds[index]
}

client.on(actions.MESSAGE, msg => {
  const message = msg.content.toLowerCase()
  if (
    me && 
    msg.author.username !== me &&
    message.includes(EXPRESSION)
  ) {
    const occurences = (message.match(REGEXP) || []).length
    nicemeter = nicemeter + occurences
    trees += ' ' + plant()
    msg.reply(`NOICE! 👌. One tree will be planted each time i hear the word "${EXPRESSION}"\n${trees}`);
  }
});

client.login(process.env.BOT_SECRET);
