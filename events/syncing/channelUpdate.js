const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
  name: Events.ChannelUpdate,
  async  execute(interaction, n) {
    let reserved = n.topic
    await db.set(`c.${interaction.id}.name`, interaction.name)
    await db.set(`c.${interaction.id}.topic`, reserved)
	},
};