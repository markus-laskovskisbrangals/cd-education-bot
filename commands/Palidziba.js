const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName('palidziba').setDescription('Komanda, lai pārliecinātos par bota darbību'),
    async execute(interaction){
        await interaction.reply('Bots darbojas.')
    }
}