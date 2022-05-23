//Koda fails /kavejumi komandai

//Bibliotēku un moduļu importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')
const {Permissions, MessageEmbed} = require('discord.js')
const sqlite3 = require('sqlite3').verbose()
const database = new sqlite3.Database('./database/discordbot.db')

//Jauna komandas moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('kavejumi').setDescription('komanda skolotājam, lai apskatītu skolēnu sarakstu, kas ir bijuši stundā'),
    async execute(interaction){
        //Datuma iegūšana
        const time = Date.now()
        const dateTime = new Date(time)
        const year = dateTime.getFullYear()
        const month = dateTime.getMonth() + 1
        const day = dateTime.getDate()
        let date = ''
        //Ja mēnesis ir mazāks par oktobri, tad tam priekš tiek pievienota 0
        month < 10 ? date =  year + '-' + '0' + month + '-' + day : date = year + '-' + month + '-' + day
        //Jauna embed objekta izveide skolēnu saraksta attēlošanai
        const resultEmbed = new MessageEmbed()
            .setTitle(`Stundas šodien (\`${date}\`) apmeklēja:`)
            .setColor('#7ee500')
        //Ja lietotājam ir administratora tiesības, tad notiek komandas izpilde
        if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            //Tiek nosūtīts SELECT pieprasījums datubāzei
            database.all(`SELECT * FROM attendance WHERE registration_date LIKE '%${date}%'`, (err, rows) => {
                if(err){
                    //Ja rodas problēma ar datubāzi, tiek izvadīts kļūdas paziņojums
                    interaction.reply('Iegūstot datus no datubāzes, radās problēma!')
                    return
                }
                //Cikls, kas katru no datubāzes iegūto skolēnu pievieno Embed objektam
                rows.forEach(row => {
                    const userName = row.user_name
                    resultEmbed.addField(`${userName}`, 'Reģistrēts')
                })
                //Čatā tiek nosūtīts saraksta ar skolēniem, kas apmeklējuši stundu
                interaction.reply({embeds: [resultEmbed]})
            })
        }else{
            interaction.reply('Tev nav atļaujas izmantot šo komandu!')
        }
    }
}