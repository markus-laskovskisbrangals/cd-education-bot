//Koda fails /registret komandai

//Bibliotēku un moduļu importēšana
const {SlashCommandBuilder} = require('@discordjs/builders')
const sqlite3 = require('sqlite3').verbose()
const {Permissions} = require('discord.js')

//Datubāzes faila ielasīšana
const database = new sqlite3.Database('./database/discordbot.db')

//Jauna komandas moduļa izbeide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('registret').setDescription('Komanda skolotājam, lai saglabātu sarakstu ar skolēmiem, kas ir pievienojušies stundai'),
    async execute(interaction){
        //Ja lietotājam ir administratora tiesības, tad komanda izpildās
        if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            //Tiek nolasīti lietotāji, kas atrodas balss kanālā
            const vcMembersList = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel.members
            const membersInVc = []
            vcMembersList.forEach(member => {
                //Uz datubāzi tiek nosūtīts INSERT pieprasījums un lietotāji pievienoti datubāzei
                database.run('INSERT INTO attendance (user_name, registration_date) VALUES (?, datetime("now", "localtime"))', member.user.username, (err) => {
                    if(err){
                        //Ja ar datubāzi rodas problēmas, tiek izvadīts kļūdas paziņojums
                        interaction.reply('Reģistrējot apmeklējumus radās problēma!')
                        console.log(err)
                        return
                    }
                })
                //Katrs lietotājs tiek pievienots masīvam
                membersInVc.push(member.user.username)
            });

            //Čatā tiek nosūtīts paziņojums par veiksmīgu lietotāju reģitrēšanu
            interaction.reply(`Kanālā tika reģistrēti ${vcMembersList.size} lietotāji.`)
        }else{
            interaction.reply('Tev nav atļaujas izmantot šo komandu!')
        }
        
    }
}