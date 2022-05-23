//Koda fails //kvadratsane komandai

//Moduļa importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')

//Kvadrātsaknes skaitļu masīva izveide
const sqrtNumbers = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400]
//Jauna komandas moduļa iveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('kvadratsakne').setDescription('Komanda, kas uzdod uzdevumu par kvadrātsaknēm'),
    execute(interaction){
        //No masīva tiek izvēlēts nejaušs skaitlis un izvilkta tā sakne
        const number = sqrtNumbers[Math.floor(Math.random() * sqrtNumbers.length)]
        const result = Math.sqrt(number)
        const author = interaction.user

        //Ziņas nosūtīšana, kas uzdod uzdevumu
        interaction.reply({ content: `${author}, Aprēķini kvadrātsakni no \`${number}\`!`, fetchReply: true})
        
        //Jauna ziņu ievākšanas filtra izveide
        const filter = m => m.author.id == author.id;
        //Jauna ziņu ievākšanas objekta izveide
        const collector = interaction.channel.createMessageCollector({ filter, time: 10000, max: 1 });

        //""Event listener funkcija, kas pārbauda vai čatā ievadīts pareizs rezultāts
        collector.on('collect', m => {
            if(m.content == result){
                interaction.followUp('Atbilde ir pareiza!')
            }else{
                interaction.followUp(`Atbilde nav pareiza! Pareizā atbilde ir \`${result}\`.`)
            }
            collector.stop()
        });

        //"Event listener" funkcija, kas nostrādā, kad beidzas minēšanas laiks
        collector.on('end', collected => {
            if(collected.size == 0){
                interaction.followUp(`Laiks ir beidzies! Pareizā atbilde ir \`${result}\`.`)
            }
        });
    }
}
