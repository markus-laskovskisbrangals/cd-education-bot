//Koda fails /reizinat komandai

//Moduļa importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')


//Jauna komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('reizinat').setDescription('Komanda, kas uzdod uzdevumu par reizrēķinu')
        .addIntegerOption(option => option.setName('robeža').setDescription("Norādi skaitļu robežas, kurās vēlies reizināt")),
    async execute(interaction){
        //Noklusējuma skaitļu intervāls
        let maxMultiplier = 20
        //Ja lietotājs opcijās ir norādījis citu skaitļu intervālu, tad tas tiek uzstādīts
        if(interaction.options.get('robeža')){
            maxMultiplier = interaction.options.get('robeža').value
        }

        //Nejaušu skaitļu ģenerēšana
        const firstMultiplier = Math.floor(Math.random() * maxMultiplier)
        const secondMultiplier = Math.floor(Math.random() * maxMultiplier)
        //Atbildes izveide
        const answer = firstMultiplier * secondMultiplier

        //Lietotājam čatā tiek nosūtīts uzdevums
        interaction.reply({content: `Aprēķini \`${firstMultiplier} * ${secondMultiplier}\`!`, fetchReply: true})

        //Jauna ziņu savācēja filtra izveide
        const filter = m => m.author.id == interaction.user.id

        //Jauna ziņu savācēja objekta izveide
        const collector = interaction.channel.createMessageCollector({filter, max: 1, time: 15000})

        //"Event listener" funkcija, lai pārbaudītu vai lietotājs ir ievadījis pareizu skaitli
        collector.on('collect', m => {
            if(m.content == answer){
                interaction.followUp('Atbilde is pareiza!')
            }else{
                interaction.followUp(`Atbilde nav pareiza! Pareizā atbilde ir \`${answer}\`.`)
            }
        })

        //"Event listener funkcija, ja laikā nav ievadīta atbilde"
        collector.on('end', collected => {
            if(collected.size == 0){
                interaction.followUp(`Laiks ir beidzies! Pareizā atbilde ir \`${answer}\``)
            }
        })

    }
}