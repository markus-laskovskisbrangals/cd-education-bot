const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('tezaurs').setDescription('Komanda, lai iegūtu vārda skaidrojumu, izmantojot Tezaurs.lv API')
        .addStringOption(option => option.setName('vārds').setDescription('Ievadi vārdu, kuram vēlies skaidrojumu')),
    async execute(interaction){
        interaction.reply("Pie tā vēl strādāju")
    }
}