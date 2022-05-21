const {SlashCommandBuilder} = require('@discordjs/builders')

const sqrtNumbers = [1, 4, 9, 16, 25, 16, 19, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400]
module.exports = {
    data: new SlashCommandBuilder().setName('kvadratsakne').setDescription('Komanda, kas uzdod uzdevumu par kvadrātsaknēm'),
    async execute(interaction){
        await interaction.reply('Command is working!')
    }
}
