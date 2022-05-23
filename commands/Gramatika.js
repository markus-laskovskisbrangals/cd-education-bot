//Fails komandas /grammar izpildei

//bibliotēku un moduļu importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
//Teikumu faila importēšana
const sentences = require('../tasks/grammar_sentences.json')

//Komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('gramatika').setDescription('Komanda, kas uzdod uzdevumu par gramatiku'),
    execute(interaction){
        //nejauši izvēlēta teikuma un atbildes ielasīšana mainīgajos
        const task = sentences[Math.floor(Math.random() * sentences.length)]
        const question = task.question
        const answer = task.answer

        //Jauna discord embed objekta izveide un vērtību piešķiršana
        const taskEmbed = new MessageEmbed()
            .setTitle('Pārraksti teikumu, izlabojot visas gramatikas kļūdas!')
            .addField('Tekums', `\`${question}\``)
            .setColor('#A4343A')
            .setFooter({text: 'Atbilde jāieraksta vienas minūtes laikā!'})
        interaction.reply({embeds: [taskEmbed]})

        //Embed objekts gadījumam, ja lietotājs ievada pareizu atbildi
        const correctEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: Pareizi')
            .setColor('#07ff5a')

        //Embed objekts gadījumam, ja tiek ievadīta nepareiza atbilde
        const incorrectEmbed = new MessageEmbed()
            .setTitle(':negative_squared_cross_mark: Nepareizi!')
            .setColor('#ff0707')
            .addField('Pareizā atbilde', `\`${answer}\``)

        //Jauna ziņu ievākšanas filtra izveide
        const filter = m => m.author.id == interaction.user.id

        //Jauna collector objekta izveide
        const collector = interaction.channel.createMessageCollector({filter, max: 1, time: 60000})

        //"Event listener" funkcija, kad lietotājs ievada atbildi
        collector.on('collect', m => {
            //Pārbaude, vai lietotājs ir ievadījis pareizu atbildi
            if(m.content == answer){
                interaction.followUp({embeds: [correctEmbed]})
            }else{
                interaction.followUp({embeds: [incorrectEmbed]})
            }
        })

        //"Event listener" funkcija, ja lietotājs ievada nepareizu atbildi
        collector.on('end', collected =>{
            if(collected.size == 0){
                interaction.followUp(`Laiks ir beidzies! Pareizā atbilde ir \`${answer}\``)
            }
        })
    }
}