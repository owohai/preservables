const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const {QuickDB} = require("quick.db")
const db = new QuickDB()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('optin')
		.setDescription('Facilitates the optting-in to message logging.'),
	async execute(interaction) {
        await interaction.deferReply();
    
        /*
        const guild = interaction.guild
        let channels = guild.channels.cache
        channels = [...channels.values()]

        //console.log(await channels[0].isTextBased())
        //index = arr.findIndex(obj => obj.msgid ===interaction.user.id);
        let a = []
        let b = []

        channels.forEach(async function (c) {
            if(c.isTextBased()) a.push(c.id)
          });

        // concat thign to merge the channels that were made and stuff
         /* if(Array.from(await db.get(`channels`)).length > 1) {
            a.concat(Array.from(await db.get(`channels`)))
          } else*/ 


          /*
        function arrayRemove(arr, value) { 
            return arr.filter(function(ele){ 
                return ele != value; 
            });
        }

        for (let index = 0; index < a.length; ++index) { 
            const element = a[index];

            //console.log(element)
            
            if(await db.get(`c.${element}.messages`) === undefined) {
                continue; //continue the loop whatever it takes until it finds any ids matching the specifications
            } else {
                //console.log(element + " is a valid entry!")
                b.push(element)
                let arr = await db.get(`c.${element}.messages`)
                let ind = arr.filter( obj => obj.authorId === interaction.user.id)
                //console.log(ind)
            ind.forEach(object => {
                let lexicon = Array.from(object).some(obj => obj.authorId === interaction.user.id);
                console.log(arr.splice(lexicon, 1))
                    }
                )
            }
            // ...use `element`...
        }
        */
          /*
        a.forEach(async function(id){
            let cur = await db.get(`c.${id}.messages`)
            if(cur = undefined) { return; }

            let ae = Array.from(cur).filter(message => message.id === interaction.user.id);
            console.log(ae)
        });*/
          /*
Array.from(channels).forEach((channel) => {
        if(channel.isTextBased() === true) a.push(channel.id)
        a.forEach(async (id) => {
         console.log(id)
        });
    });
    */
   
		//await interaction.reply(`Hey2`);

        if(db.has(`optedIn`, interaction.user.id) === true || undefined) return;

        await db.push(`optedIn`, interaction.user.id)
            const row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
					.setCustomId(`optout.${interaction.user.id}`)
					.setLabel('Opt-out')
					.setStyle(ButtonStyle.Danger),
			    );

            await interaction.editReply({embeds:[new EmbedBuilder().setTitle("Opt-in Success").setDescription(`Dear ${interaction.user.username}, Perservable will now start to log messages you send. \nYou can still (optionally) opt-out if you wish. Once you opt out, all the data we have on you would be deleted.`).setColor('DarkGreen')], components: [row], ephemeral: true})
	},
};