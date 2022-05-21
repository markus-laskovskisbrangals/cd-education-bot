const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('stunda').setDescription('Izveido pierakstu kanālu mācību stundai').addStringOption(option => option.setName('nosaukums').setDescription('Ievadiet pierakstu kanāla nosaukumu')),
    async execute(interaction){
        const thread = await interaction.channel.threads.create({
            name: interaction.options.getString('nosaukums'),
            autoArchiveDuration: 60,
            reason: 'Pierakstu kanāls mācību stundai'
        })

        await interaction.reply('Kanāls pierakstiem izveidots veiksmīgi!')
    }
}