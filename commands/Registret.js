const {SlashCommandBuilder} = require('@discordjs/builders')
const sqlite3 = require('sqlite3').verbose()
const database = new sqlite3.Database('./database/discordbot.db')
const {Permissions} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('registret').setDescription('Komanda skolotājam, lai saglabātu sarakstu ar skolēmiem, kas ir pievienojušies stundai'),
    async execute(interaction){
        if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            const vcMembersList = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel.members
            const membersInVc = []
            vcMembersList.forEach(member => {
                database.run('INSERT INTO attendance (user_name, registration_date) VALUES (?, datetime("now", "localtime"))', member.user.username, (err) => {
                    if(err){
                        interaction.reply('Reģistrējot apmeklējumus radās problēma!')
                        console.log(err)
                        return
                    }
                })
                membersInVc.push(member.user.username)
            });

            interaction.reply(`Kanālā tika reģistrēti ${vcMembersList.size} lietotāji.`)
        }else{
            interaction.reply('Tev nav atļaujas izmantot šo komandu!')
        }
        
    }
}