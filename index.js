const {Client, Intents, Interaction} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS]})
require('dotenv').config

client.on('ready', () => {
    console.log('Bots ir gatavs lietošanai')
})

client.on('InteractionCreate', async Interaction => {
    if(!Interaction.isCommend()) return;

    if(Interaction.commandName == 'ping'){
        await Interaction.reply('pong')
    }
})

client.login('OTY1NjQ1NjExMDQ5MjkxODU3.GldLYs.UNSZtxf0ZalF7nEoNUO9os5E3qKdgMfRqJyMdM')