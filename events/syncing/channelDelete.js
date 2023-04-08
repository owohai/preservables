const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
  name: Events.ChannelDelete,
  async  execute(interaction) {
    await db.delete(`c.${interaction.id}`)
	},
};