const {SlashCommandBuilder} = require('@discordjs/builders')
const {Permissions, MessageEmbed} = require('discord.js')
const sqlite3 = require('sqlite3').verbose()
const database = new sqlite3.Database('./database/discordbot.db')


module.exports = {
    data: new SlashCommandBuilder().setName('kavejumi').setDescription('komanda skolotājam, lai apskatītu skolēnu sarakstu, kas ir bijuši stundā'),
    async execute(interaction){
        const time = Date.now()
        const dateTime = new Date(time)
        const year = dateTime.getFullYear()
        const month = dateTime.getMonth() + 1
        const day = dateTime.getDate()
        let date = ''
        month < 10 ? date =  year + '-' + '0' + month + '-' + day : date = year + '-' + month + '-' + day
        let attendants = []
        const resultEmbed = new MessageEmbed()
            .setTitle(`Stundas šodien (\`${date}\`) apmeklēja:`)
            .setColor('#7ee500')
        if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            database.all(`SELECT * FROM attendance WHERE registration_date LIKE '%${date}%'`, (err, rows) => {
                if(err){
                    interaction.reply('Iegūstot datus no datubāzes, radās problēma!')
                }
                console.log(`Rowa ${rows.length}`)
                rows.forEach(row => {
                    const userName = row.user_name
                    console.log(`${userName} - ${row.registration_date}`)
                    attendants.push(userName)
                    resultEmbed.addField(`${userName}`, 'Reģistrēts')
                })
                console.log(`Attendants ${attendants.length}`)
                interaction.reply({embeds: [resultEmbed]})
            })
        }else{
            interaction.reply('Tev nav atļaujas izmantot šo komandu!')
        }
    }
}