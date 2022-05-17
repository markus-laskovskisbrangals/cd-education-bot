const {Client, Intents, Interaction, Message} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS]})
require('dotenv').config()

client.on('ready', () => {
    console.log('Bots ir gatavs lietošanai')
})

client.on('interactionCreate', async Interaction => {
    if(!Interaction.isCommand()) return;

    if(Interaction.commandName == 'ping'){
        await Interaction.reply('Ej dirst')
    }
})

client.login(process.env.TOKEN)