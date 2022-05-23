# Skolas Asistents

Skolas asistents ir Discord bots, kas ir izstrādāts ar mērķi padarīt skolēniem mācīšanos Discord vidē aizraujošāku un interaktīvāku. Bots palīdz skolēniem un skolotājiem integrēt Discord savās mācību stundās piedāvājot dažādus interaktīvus uzdevumus, automātisku kanālu izveidi stundu pierakstiem un automātisku apmeklējumu reģistrēšanu. Botu izstrādāja Markus Ļaskovskis Brangals.

**Lai bots darbotos, ir nepieciešama NodeJS 16. versija**

## Bota uzstādīšana savā serverī

* Piezīme: * ja jums vēl nav sava Discord servera, tad nospiediet [šeit](https://discord.new/UqmwrxqAyyGc) un tas tiks izbeidots automātiski.
 
1. Dodaties uz [Discord izstrādātāju protālu](https://discord.com/developers/applications) un izveidojiet jaunu lietotni.
2. Jaunizveidotās lietotnes sadaļā "Bot", pieslēdzoiet lietotnei bota funkciju
3. Šajā pašā sadaļā nokopējiet uzģenerēto "token" un saglabājiet to drošā vietā. **Nekādā gadījumā nerādiet to vitiem!**
4. Šajā pašā sadaļā atzīmējiet "Server members intent" un "Message content intent"
5. Dodaties atpakaļ uz sadaļu "General" u nokopējiet "Client ID"
6. Atveriet datorā komandu uzvedni un klonējiet šo repozitoriju `git clone https://github.com/markus-laskovskisbrangals/dc-education-bot.git`
7. Instalējiet nepieciešamās node pakotnes ar `npm i` (ja komanda npm nav atrasta, tad instalējiet [Node.js](https://nodejs.org/en/))
8. Faili .env.template pārdēvējiet pat .env un aizpildiet to ar nepieciešamo informāciju (CLIENT_ID - iepriekš nokopētais "Client ID", TOKEN - iepriekš nokopētais bota "token", GUILD_ID - Discord servera ID, to var iegūt ieslēdzot izstrādātāja iestatījumus Discord platformā, nospiežot labo klikšķi uz servera un "Copy ID", DEEPL_API_KEY - API atslēga priekš deepl.com, to var iegūt [šeit](https://www.deepl.com/pro-api?cta=header-pro-api))
9. Dodaties uz sadaļu "database" un pārsauciet "discordbot.db.dev" us "discordbot.db"
10. Pievienojiet botu serverim, izveidojot saiti: vēlreiz atveriet Discord izstrādātāju portālu, izvēlieties lietotni, atveriet "OAuth2" sadaļu, atzīmējiet sarakstā opciju "Bot" un nokopējiet lapas apakšā izveidoto saiti. Atveriet šo saiti savā pārlūkprogrammā
11. Izvēlieties serveri, kurā pievienot botu un apstipriniet, ka neesat robots
12. Komandu uzvednī ievadiet komandu `node command-handler.js`, lai reģistrētu komandas savā serverī
13. Ievadiet komandu `node index.js`, lai startētu botu
14. Dodaties uz serveri un ievadiet komandu `/ping`, ja viss ir izdarīts veiksmīgi, tad jūsu botam čatā būtu jānosūta ziņa, ka tas ir uzstādīts veiksmīgi
15. Ar komandu `help` jūs varat apskatīt visas komandas, kuras piedāvā šis bots

Jaut;ajumu gadījumā sazinieties ar mani, sūtot man e-pastu uz markus.laskovskisbrangals@va.lv.