//Fails komandai /inftests

//Bibliotēku un moduļu importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
//Jautājumu faila importēšana
const questions = require('../tasks/coumputer-questions.json')

//Komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide un vērtību piešķiršana
    data: new SlashCommandBuilder().setName('inftests').setDescription('Komanda, kas atgtgriež jautājumu informātikas tēmā'),
    async execute(interaction){
        //Nejauša jautājuma izvēlēšanās un jautājuma un atbildes ielasīšana mainīgajos
        const task = questions[Math.floor(Math.random() * questions.length)]
        const question = task.question
        const answer = task.answer

        //Programmas kods, ka izveido divas jaunas pogas priekš nosūtītās ziņas
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
        
        //Embed objekts gadījumam, ja nospiesta pareizā poga
        const correctEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: Pareizi')
            .setColor('#07ff5a')

        //Embed objekts gadījumam, ja tiek nospiesta nepareizā poga
        const incorrectEmbed = new MessageEmbed()
            .setTitle(':negative_squared_cross_mark: Nepareizi!')
            .setColor('#ff0707')

        //Lietotājam tiek uzdots jautājums
        await interaction.reply({content: `${question}`, components: [buttonGroup]})

        //Jauna ziņu ievākšanas filtra izveide
        const filter = i => i.user.id == interaction.user.id
        
        //Jauna ziņu ievākšanas objekta izveide
        const collector = interaction.channel.createMessageComponentCollector({filter, max: 1, time: 10000})

        //"Event listener" funkcija, kas gaida pogas nospiešanu
        collector.on('collect', i => {
            //Pārbaude, vai nospiesta pareizā poga
            if(i.customId == answer){
                i.update({embeds: [correctEmbed], components: []})
            }else{
                i.update({embeds: [incorrectEmbed], components: []})
            }
        })

        //"Event listener" funkcija, ja laikā nav nospiesta poga
        collector.on('end', collected => {
            if(collected.size == 0){
                interaction.followUp('Laiks ir beidzies!')
            }
        })
    }
}