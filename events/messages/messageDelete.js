const { Events } = require('discord.js');
const config = require('../../config.json')
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
	name: Events.MessageDelete,
	async  execute(interaction) {
        if(Array.from(await db.get(`optedIn`)).includes(interaction.author.id) === false || undefined) return;        
        if(interaction.channel.id === config.logging) return;

        if (interaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await interaction.fetch();
            } catch (error) {
                console.error('a message was deleted before we could\'ve cached it.');
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        let arr = await db.get(`c.${interaction.channel.id}.messages`)
        index = arr.findIndex(obj => obj.msgid ===interaction.id);
 
        // implementing the same as msgUpdate
          // LITREALLY deletes ALL the messages within the array
      await db.delete(`c.${interaction.channel.id}.messages`)
          console.log(arr[index])
          if(arr.length < 1) {
            return await db.delete(`c.${interaction.channel.id}.messages`)
            } else {
             arr.splice(index, 1)
            }

            await db.set(`c.${interaction.channel.id}.messages`, arr)
        /* 
        WHAT I KNOW SO FAR:

        CHANNELS:
        - interaction.channel.name (channel name)
        - interaction.channel (channel tag [<#721677325951041547>])
        - interaction.channel.id (channel id i'm guessing)
        \-\-\-\-\--\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\
        */
	},
};