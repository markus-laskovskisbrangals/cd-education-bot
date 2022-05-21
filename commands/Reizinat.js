const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('reizinat').setDescription('Komanda, kas uzdod uzdevumu par reizrēķinu')
        .addIntegerOption(option => option.setName('robeža').setDescription("Norādi skaitļu robežas, kurās vēlies reizināt")),
    async execute(interaction){
        let maxMultiplier = 20
        if(interaction.options.get('robeža')){
            maxMultiplier = interaction.options.get('robeža').value
        }

        const firstMultiplier = Math.floor(Math.random() * maxMultiplier)
        const secondMultiplier = Math.floor(Math.random() * maxMultiplier)
        const answer = firstMultiplier * secondMultiplier

        interaction.reply({content: `Aprēķini \`${firstMultiplier} * ${secondMultiplier}\`!`, fetchReply: true})

        const filter = m => m.author.id == interaction.user.id

        const collector = interaction.channel.createMessageCollector({filter, max: 1, time: 15000})

        collector.on('collect', m => {
            if(m.content == answer){
                interaction.followUp('Atbilde is pareiza!')
            }else{
                interaction.followUp(`Atbilde nav pareiza! Pareizā atbilde ir \`${answer}\`.`)
            }
        })

        collector.on('end', collected => {
            if(collected.size == 0){
                interaction.followUp(`Laiks ir beidzies! Pareizā atbilde ir \`${answer}\``)
            }
        })

    }
}