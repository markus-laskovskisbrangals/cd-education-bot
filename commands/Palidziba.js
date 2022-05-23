//Koda fails /palidziba komandai

//Bibliotēku un moduļu importēšana
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

//Jauna moduļa izveide
module.exports = {
    //Jauna komandas objekta izveide
    data: new SlashCommandBuilder().setName('palidziba').setDescription('Komanda, lai pārliecinātos par bota darbību'),
    async execute(interaction){
        //Mainīgajā tiek ielasīts lietotājs, kas izpildīja komandu
        const user = interaction.guild.members.cache.get(interaction.user.id)
        //Jauna embed objekta izveide un parametru pievienošana
        const helpEmbed = new MessageEmbed()
            .setTitle(':information_source: Skolas asistenta instrukcija')
            .setDescription('Skolas asistents ir Discord bots, kas ir izstrādāts ar mērķi padarīt skolēniem mācīšanos Discord vidē aizraujošāku un interaktīvāku. Bots palīdz skolēniem un skolotājiem integrēt Discord savās mācību stundās piedāvājot dažādus interaktīvus uzdevumus, automātisku kanālu izveidi stundu pierakstiem un automātisku apmeklējumu reģistrēšanu. Botu izstrādāja Markus Ļaskovskis Brangals.')
            .addFields(
                {name: '/ping', value: 'Komanda, lai pārliecinātos par bota veiksmīgu uzstādīšanu serverī.'},
                {name: '/palidziba', value: 'Komanda, kas lietotājam privāti nosūta bota lietošanas instrukciju ar aprakstu, un komandām.'},
                {name: '/kvadratsakne', value: 'Komanda, kas lietotājam uzdod izvilkt kvadrātsakni no nejauši izvēlēta skaitļa (atbilde jāieraksta čatā **10** sekunžu laikā).'},
                {name: '/reizinat', value: 'Komanda, kas lietotājam uzdod atrisināt reizrēķina piemēru. Pēc noklusējuma tiek ģenerēti skaitļi no 0 līdz 20, taču lietotājs var mainīt šo robežu. Lietojums `/reizinat [skaitļu robeža (neobligāti)]`'},
                {name: '/skaitit', value: 'Komanda, kas lietotājam uzdod atrisināt saskaitīšanas piemēru. Pēc noklusējums tiek ģenerēti skaitļi no 0 līdz 100, taču robežu lietotājs var mainīt. Lietojums `/skaitit [skaitļu robeža (neobligāti)]`'},
                {name: '/gramatika', value: 'Komanda, kas lietotājam iedod nepareizi uztrakstītu teikumu. Lietotāja uzdevums ir čatā pārrakstīt teikumu, izlabojot visas gramatikas kļūdas. Tas jāizdara 1 minūtes laikā.'},
                {name: '/inftests', value: 'Komanda, kas lietotājam iedod nejauši izvēlētu argumentu par datoriku. Lietotāja uzdevums ir 10 sekunžu laikā nospiest uz viņaprāt pareizās atbildes ("Jā" vai "Nē").'},
                {name: '/tulkot', value: 'Komanda, kas atgriež teksta tulkojumu latviešu valodā lietotāja padotajam tekstam. Komanda izstrādāta, izmantojot Deepl.com API risinājumu.'},
                {name: '/registret', value: 'Komanda **skolotājiem**, ar kuras palīdzību ir iespējams piereģistrēt skolēnus, kas ir ieradušies stundā. Komanda automātiski nolasa skolēnu vārdus no balss kanāla un tos saglabā.'},
                {name: '/kavejumi', value: 'Komanda **skolotājiem**, kas atgriež iepriekš reģistrētos skolēnus, kas ir apmeklējuši mācību stundu (komanda atgriež rezultātus no konkrētās dienas).'},
                {name: '/stunda', value: 'Komanda **skolotājiem**, kas automātiski izveidot īslaicīgu teksta kanālu (thread), kurā var veikt pierakstus konkrētajai mācību stundai. Lietojums `/stunda [kanāla nosaukums (obligāts)]`.'}
            )
            .setColor('#1eaafc')
        //Lietotājam privāti tiek nosūtīts bota apraksta un komandu saraksts
        user.send({embeds: [helpEmbed]}).catch(console.error)
        //Paziņojums servera čatā par ziņas nosūtīšanu
        interaction.reply(':white_check_mark: Visas komandas un to skaidrojumi tika nosūtīti Jums privāti.')
    }
}