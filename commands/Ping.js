const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Komanda, lai pārliecinātos par bota darbību'),
    async execute(interaction){
        await interaction.reply('Bots darbojas.')
    }
}