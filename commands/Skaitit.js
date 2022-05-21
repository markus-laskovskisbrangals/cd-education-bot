const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('saskaitit').setDescription('Komanda, kas uzdod uzdevumu par skaitļu saskaitīšanu')
        .addIntegerOption(option => option.setName('robeža').setDescription("Norādi skaitļu robežas, kurās vēlies saskaitīt")),
    async execute(interaction){
        let maxNumber = 100
        if(interaction.options.get('robeža')){
            maxMultiplier = interaction.options.get('robeža').value
        }

        const firstNumber = Math.floor(Math.random() * maxNumber)
        const secondNumber = Math.floor(Math.random() * maxNumber)
        const answer = firstNumber + secondNumber

        interaction.reply({content: `Aprēķini \`${firstNumber} + ${secondNumber}\`!`, fetchReply: true})

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