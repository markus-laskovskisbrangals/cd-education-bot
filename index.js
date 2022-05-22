const {Client, Intents, Interaction, Message, Collection} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES]})
require('dotenv').config()
const fs = require('fs')
const path = require('path')

client.commands = new Collection()
const commandLocation = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandLocation).filter(file => file.endsWith('.js'))

for(const commandfile of commandFiles){
    const fileLocation = path.join(commandLocation, commandfile)
    const command = require(fileLocation)
    client.commands.set(command.data.name, command)
}

client.on('ready', () => {
    console.log('Bots ir gatavs lietošanai')
})

client.on('interactionCreate', async Interaction => {
    if(!Interaction.isCommand()) return;

    const command = client.commands.get(Interaction.commandName)

    if(!command) return

    try{
        await command.execute(Interaction)
    }catch(error){
        console.log(error)
        await Interaction.reply('Palaižot komandu, radās problēma. Lūdzu vēlāk mēģiniet vēlreiz!')
    }

})

client.login(process.env.TOKEN)