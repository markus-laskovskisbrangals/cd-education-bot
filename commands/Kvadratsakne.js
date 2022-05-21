const {SlashCommandBuilder} = require('@discordjs/builders')

const sqrtNumbers = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400]
module.exports = {
    data: new SlashCommandBuilder().setName('kvadratsakne').setDescription('Komanda, kas uzdod uzdevumu par kvadrātsaknēm'),
    execute(interaction){
        const number = sqrtNumbers[Math.floor(Math.random() * sqrtNumbers.length)]
        const result = Math.sqrt(number)
        const author = interaction.user

        interaction.reply({ content: `${author}, Aprēķini kvadrātsakni no \`${number}\`!`, fetchReply: true})
        
        const filter = m => m.author.id == author.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 10000, max: 1 });

        collector.on('collect', m => {
            if(m.content == result){
                interaction.followUp('Atbilde ir pareiza!')
            }else{
                interaction.followUp(`Atbilde nav pareiza! Pareizā atbilde ir \`${result}\`.`)
            }
            collector.stop()
        });

        collector.on('end', collected => {
            if(collected.size == 0){
                interaction.followUp(`Laiks ir beidzies! Pareizā atbilde ir \`${result}\`.`)
            }
        });
    }
}
