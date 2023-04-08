const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
	name: Events.ChannelCreate,
	async  execute(interaction) {
    await db.push(`channels`, interaction.id)
    await db.set(`c.${interaction.id}.name`, interaction.name)
    await db.set(`c.${interaction.id}.id`, interaction.id)
	},
};