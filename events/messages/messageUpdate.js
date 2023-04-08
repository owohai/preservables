const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const config = require('../../config.json')
const db = new QuickDB();

module.exports = {
	name: Events.MessageUpdate,
	async  execute(oldMessage, newMessage) {
        if(newMessage.author === null || undefined) return;
        if(newMessage.channel.id === config.logging) return;
        if(Array.from(await db.get(`optedIn`)).includes(newMessage.author.id) === false || undefined) return;        
        
        // prevent the message from being edited
        if(newMessage.pinned === true) return;

        let arr = await db.get(`c.${newMessage.channel.id}.messages`)
        /*
        let index = Array.from(arr).findIndex((obj => obj.msgId == newMessage.id));
        console.log(arr[index])

        arr[index].msg = newMessage
        console.log(arr[index])*/
        index = arr.findIndex(obj => obj.msgid ===newMessage.id);

        // LITREALLY deletes ALL the messages within the array
       await db.delete(`c.${newMessage.channel.id}.messages`)
       // completely changes the content of the desired message
       // that's stored within our local arr value
       arr[index].msg = newMessage.content + " *(edited)*"
       // send away the local arr value (which should be the same
       // as when we deleted it but modified)
       await db.set(`c.${newMessage.channel.id}.messages`, arr)
	},
};