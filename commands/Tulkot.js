const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
    data: new SlashCommandBuilder().setName('tulkot').setDescription('Komanda, lai tulkotu tekstu no svešvalodas latviešu valodā')
        .addStringOption(option => option.setName('teksts').setDescription('Tulkojamais teksts')),
    async execute(interaction){
        if(!interaction.options.get('teksts')){
            interaction.reply('Nepilnīga komanda! Pievieno tekstu, kuru vēlies tulkot!')
        }
        const URL = 'https://api-free.deepl.com/v2/translate?auth_key='
        const apiKey = process.env.DEEPL_API_KEY
        const text = encodeURIComponent(interaction.options.get('teksts').value)
        const language = 'LV'
        const request = URL + apiKey + '&text=' + text + '&target_lang=' + language

        const {body} = await superagent.get(request)

        const result = new MessageEmbed()
            .setTitle('Teksta tulkotājs')
            .setColor('#9985fc')
            .addFields(
                {name: `Oriģinālais teksts ${body.translations[0].detected_source_language} valodā`, value: interaction.options.get('teksts').value},
                {name: 'Tulkojums latviešu valodā', value: `${body.translations[0].text}`}
            )
            .setFooter({text: 'Teksts tulkots, izmantojot deepl.com bezmaksas API risinājumu'})
        
        interaction.reply({embeds: [result]})
    }
}