const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const questions = require('../tasks/coumputer-questions.json')

module.exports = {
    data: new SlashCommandBuilder().setName('inftests').setDescription('Komanda, kas atgtgriež jautājumu informātikas tēmā'),
    async execute(interaction){
        const task = questions[Math.floor(Math.random() * questions.length)]
        const question = task.question
        const answer = task.answer

        const buttonGroup = new MessageActionRow()
            .addComponents(
                new MessageButton( )
                    .setCustomId('yesOption')
                    .setLabel('Jā')
                    .setStyle('SUCCESS'),
                new MessageButton( )
                    .setCustomId('noOption')
                    .setLabel('Nē')
                    .setStyle('DANGER'),

            )
        
        const correctEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: Pareizi')
            .setColor('#07ff5a')

        const incorrectEmbed = new MessageEmbed()
            .setTitle(':negative_squared_cross_mark: Nepareizi!')
            .setColor('#ff0707')

        await interaction.reply({content: `${question}`, components: [buttonGroup]})

        const filter = i => i.user.id == interaction.user.id
        
        const collector = interaction.channel.createMessageComponentCollector({filter, max: 1, time: 10000})

        collector.on('collect', i => {
            if(i.customId == answer){
                i.update({embeds: [correctEmbed], components: []})
            }else{
                i.update({embeds: [incorrectEmbed], components: []})
            }
        })

        collector.on('end', collected => {
            if(collected.size == 0){
                interaction.followUp('Laiks ir beidzies!')
            }
        })
    }
}