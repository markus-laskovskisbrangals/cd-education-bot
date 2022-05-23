//Šis fails nodrošina komandu reģistrēšanu lietotāja Discord serverī

//Bibliotēku un ietvaru importēšana
const fs = require('fs');
const path = require('path')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
require('dotenv').config()

//Komandu masīva izveide un komandu failu atrašanās vietas deklarēšana
const commands = []
const commandLocation = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandLocation).filter(file => file.endsWith('.js'))

//Cikls, kas importē visus komandu failus un pievieno tos masīvam
for(const command of commandFiles){
  const filePath = path.join(commandLocation, command)
  const newCommand = require(filePath)
  commands.push(newCommand.data.toJSON())
}

//Jauna REST objekta izveide, kas nodrošina saziņu ar Dsicord API
const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		//POST pieprasījuma nosūtīšana Discord API serverim ar komandu sarakstu
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();