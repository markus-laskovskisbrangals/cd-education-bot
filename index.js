
/*  ==========================================================================================================================
    Discord bota "Skolas asistents" programmas kods.
    Programma ir praktiskā darba izstrāde Vidzemes Augstskolas 2. kursa studenta Markusa Ļaskovska Brangala gada projektam.
    Discord botts izstrādāts ar mērķi integrēt Discord skolēnu un skolotāju mācību stundās.
    ==========================================================================================================================
*/

//Bibliotēku un ietvaru importēšana
const {Client, Intents, Collection} = require('discord.js')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

//Jauna discord bots objekta izveide
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES]})

//Jauna komandu moduļa objekta izveide un komandu failu atrašanās vietas deklarēšana
client.commands = new Collection()
const commandLocation = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandLocation).filter(file => file.endsWith('.js'))

//cikls, kas importē visus komandu failus
for(const commandfile of commandFiles){
    const fileLocation = path.join(commandLocation, commandfile)
    const command = require(fileLocation)
    client.commands.set(command.data.name, command)
}

//Kad bots ir veiksmīgi startējies, tiek izvadīta ziņa konsolē
client.on('ready', () => {
    console.log('Bots ir gatavs lietošanai')
})

//Fukcija jeb "Event Listener" kas komandas izpildes brīdī izsauc execute() funkciju no komandas faila
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

//Metode, kas veic Discord API autenticikāciju
client.login(process.env.TOKEN)