//Koda fails /tulkot komandai

//Bibliotēku un moduļu importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

//Jauna komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('tulkot').setDescription('Komanda, lai tulkotu tekstu no svešvalodas latviešu valodā')
        .addStringOption(option => option.setName('teksts').setDescription('Tulkojamais teksts')),
    async execute(interaction){
        //Ja nav norādīts teksts, kuru tulkot, tiek izvadīts kļūdas paziņojums
        if(!interaction.options.get('teksts')){
            interaction.reply('Nepilnīga komanda! Pievieno tekstu, kuru vēlies tulkot!')
            return
        }
        //URL izveide prieks API pieprasījuma nosūtīšanas
        const URL = 'https://api-free.deepl.com/v2/translate?auth_key='
        const apiKey = process.env.DEEPL_API_KEY
        const text = encodeURIComponent(interaction.options.get('teksts').value)
        const language = 'LV'
        const request = URL + apiKey + '&text=' + text + '&target_lang=' + language

        //API pieprasījuma nosūtīšana uz deepl.com
        const {body} = await superagent.get(request)

        //Jauna Embed objekta izveide tulkojuma attēlošanai
        const result = new MessageEmbed()
            .setTitle('Teksta tulkotājs')
            .setColor('#9985fc')
            .addFields(
                {name: `Oriģinālais teksts ${body.translations[0].detected_source_language} valodā`, value: interaction.options.get('teksts').value},
                {name: 'Tulkojums latviešu valodā', value: `${body.translations[0].text}`}
            )
            .setFooter({text: 'Teksts tulkots, izmantojot deepl.com bezmaksas API risinājumu'})
        
        //Tulkotā teksta rezultāta nosūtīšana čatā
        interaction.reply({embeds: [result]})
    }
}