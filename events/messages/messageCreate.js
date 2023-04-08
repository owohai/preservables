const { Events } = require('discord.js');
const config = require('../../config.json')
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
	name: Events.MessageCreate,
	async  execute(interaction) {
        //console.log(interaction.pinned)

        if(interaction.partial) return;
        if(!interaction.content) return;
        if(interaction.system === true) return;
        if(interaction.channel.isThread() === true) return;
        if(interaction.channel.id === config.logging) return;
        if(Array.from(await db.get(`optedIn`)).includes(interaction.author.id) === false || undefined) return;        

         await db.set(`c.${interaction.channel.id}.name`, interaction.channel.name)
         await db.set(`c.${interaction.channel.id}.id`, interaction.channel.id)
         if(interaction.channel.topic === null) {await db.set(`c.${interaction.channel.id}.topic`, 0)} else {await db.set(`c.${interaction.channel.id}.topic`, interaction.channel.topic)}
         await db.push(`c.${interaction.channel.id}.messages`, { authorId: `${interaction.author.id}`, avatar:`${interaction.author.avatar}`, msg: `${interaction.content}`, timestamp: `${interaction.createdAt}`, msgid: `${interaction.id}` })
        /// console.log(await db.get(`c.${interaction.channel.id}`))
        //if(interaction.user.bot === true) console.log("THIS IS A BOT")
        /* 
 		console.log(`created ${interaction.channel.name}`);
        console.log(interaction.content)
        console.log(`${interaction.createdAt}`);
        
        https://discord.js.org/?source=post_page---------------------------#/docs/discord.js/stable/class/Message?scrollTo=createdAt
        WHAT I KNOW SO FAR:

        CHANNELS:
        - interaction.channel.name (channel name)
        - interaction.channel (channel tag [<#721677325951041547>])
        - interaction.channel.id (channel id i'm guessing)
        \-\-\-\-\--\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\
        */
	},
};