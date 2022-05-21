const fs = require('fs');
const path = require('path')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
require('dotenv').config()

const commands = []
const commandLocation = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandLocation).filter(file => file.endsWith('.js'))

for(const command of commandFiles){
  const filePath = path.join(commandLocation, command)
  const newCommand = require(filePath)
  commands.push(newCommand.data.toJSON())
}

const rest = new REST({version: 9}).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
  .then(console.log('Komandas uzstādītas veiksmīgi!'))
  .catch(console.error)