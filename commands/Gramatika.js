const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const sentences = require('../tasks/grammar_sentences.json')

module.exports = {
    data: new SlashCommandBuilder().setName('gramatika').setDescription('Komanda, kas uzdod uzdevumu par gramatiku'),
    execute(interaction){
        const task = sentences[Math.floor(Math.random() * sentences.length)]
        const question = task.question
        const answer = task.answer

        const taskEmbed = new MessageEmbed()
            .setTitle('Pārraksti teikumu, izlabojot visas gramatikas kļūdas!')
            .addField('Tekums', `\`${question}\``)
            .setColor('#A4343A')
            .setFooter({text: 'Atbilde jāieraksta vienas minūtes laikā!'})
        interaction.reply({embeds: [taskEmbed]})

        const correctEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: Pareizi')
            .setColor('#07ff5a')

        const incorrectEmbed = new MessageEmbed()
            .setTitle(':negative_squared_cross_mark: Nepareizi!')
            .setColor('#ff0707')
            .addField('Pareizā atbilde', `\`${answer}\``)

        const filter = m => m.author.id == interaction.user.id

        const collector = interaction.channel.createMessageCollector({filter, max: 1, time: 60000})


        collector.on('collect', m => {
            if(m.content == answer){
                interaction.followUp({embeds: [correctEmbed]})
            }else{
                interaction.followUp({embeds: [incorrectEmbed]})
            }
        })

        collector.on('end', collected =>{
            if(collected.size == 0){
                interaction.followUp(`Laiks ir beidzies! Pareizā atbilde ir \`${answer}\``)
            }
        })
    }
}