const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
  name: Events.ThreadCreate,
  async  execute(interaction) {
    //console.log(interaction)
    /* 
    https://discord.js.org/#/docs/discord.js/main/class/ThreadChannel
    Depercated logging function for now
    */
	},
};