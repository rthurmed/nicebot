const http = require('http')
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
    console.log(`${new Date().toISOString()}: ${msg.author.username} said nice`);

    const occurences = (message.match(REGEXP) || []).length
    nicemeter = nicemeter + occurences
    for (i in [...Array(occurences).keys()]) {
      trees += ' ' + plant()
    }
    msg.reply(`NOICE! 👌. One tree will be planted each time i hear the word "${EXPRESSION}"\n${trees}`);
  }
});

client.login(process.env.BOT_SECRET);

// Creates a server to trick heroku into keeping the bot online
const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(await JSON.stringify({ message: 'I\'m alive' }))
  res.end()
})

server.listen(process.env.PORT || 3000)