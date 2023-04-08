const { Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
  name: Events.GuildUpdate,
  async  execute(interaction) {
    await db.set(`g.${interaction.id}.name`, interaction.name)
    await db.set(`g.${interaction.id}.ownerId`, interaction.ownerId)
    await db.set(`g.${interaction.id}.id`, interaction.id)
	},
};