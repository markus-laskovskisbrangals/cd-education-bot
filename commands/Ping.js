//Koda fails /ping komandai

//Moduļa importēšana
const { SlashCommandBuilder } = require("@discordjs/builders")

//Jauna komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('ping').setDescription('Komanda, lai pārliecinātos par bota darbību'),
    async execute(interaction){
        //Ja Komanda nostrādā un bots ir uzstāts, čatā tiek nosūtīta ziņa
        await interaction.reply('Skolas asistents ir ieslēgts un gatavs darbam.')
    }
}