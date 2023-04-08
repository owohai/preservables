const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
	name: Events.ChannelPinsUpdate,
	async  execute(interaction) {
        if(Array.from(await db.get(`optedIn`)).includes(interaction.author.id) === false || undefined) return;        

        interaction.messages.fetchPinned()
  .then(messages => {
    if(messages.size === 0) { return console.log("all messages were unpinned") } else/*if([...messages.keys()].includes(db.get(`structure.id`)))*/ {
    console.log(`Received ${messages.size} messages\n ${[...messages]}`) +
    console.log(`Assuming the current message was PINNED, it should be ${messages.first()} or (${[...messages.keys()][0]})`)
    }}
    )
  .catch(console.error);
		//console.log(`PINed ${interaction.author}`);
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