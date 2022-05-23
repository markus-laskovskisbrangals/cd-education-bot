//Koda fails /stunda komandai

//Moduļu pievienošana
const {SlashCommandBuilder} = require('@discordjs/builders')
const {Permissions} = require('discord.js')

//Jauna komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('stunda').setDescription('Izveido pierakstu kanālu mācību stundai').addStringOption(option => option.setName('nosaukums').setDescription('Ievadiet pierakstu kanāla nosaukumu')),
    async execute(interaction){
        //Ja lietotājam ir administrators tiesības, komanda tiek izpildīta
        if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            //Ja nav norādīts kanāla nosaukums, tiek izvadīts kļūdas paziņojums
            if(!interaction.options.getString('nosaukums')){
                interaction.reply('Nepilnīga komanda! Norādi kanāla nosaukmu!')
                return
            }
            //Jauna īstermiņa kanāla (thread) izveide
            const thread = await interaction.channel.threads.create({
                name: interaction.options.getString('nosaukums'),
                autoArchiveDuration: 60,
                reason: 'Pierakstu kanāls mācību stundai'
            })

            //Paziņojums par veiksmīgu kanāla izveidi
            await interaction.reply('Kanāls pierakstiem izveidots veiksmīgi!')
        }else{
            interaction.reply('Tev nav atļaujas izmantot šo komandu!')
        }

    }
}