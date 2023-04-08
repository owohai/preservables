const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const config = require('../../config.json')
const db = new QuickDB();

module.exports = {
	name: Events.MessageReactionRemove,
	async  execute(reaction, user) {
        if(reaction.message.channelId === config.logging) return;

		if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }
        if(Array.from(await db.get(`optedIn`)).includes(reaction.message.author.id) === false || undefined) return;        

        let arr = await db.get(`c.${reaction.message.channelId}.messages`)
        index = arr.findIndex(obj => obj.msgid ===reaction.message.id);
 
        // implementing the same as msgUpdate
          // LITREALLY deletes ALL the messages within the array
       await db.delete(`c.${reaction.message.channelId}.messages`)
       // completely changes the content of the desired message
       // that's stored within our local arr value
       if(reaction.count === undefined) console.log("e")
       let home = arr[index].reactions
       if(reaction.count < 1 || undefined) {
        home.shift()
       } else {
        home.splice(index, 1)
       }

       await db.set(`c.${reaction.message.channelId}.messages`, arr)

       /*
        // Now the message has been cached and is fully available
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction! ${reaction.emoji}`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
        
        WHAT I KNOW SO FAR:

        REACTIONS:
        - ${reaction.message.author}
        - ${reaction.message.content}
        - ${reaction.emoji}
        \-\-\-\-\--\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\
        */
	},
};