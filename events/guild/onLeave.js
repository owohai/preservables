const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const {QuickDB} = require("quick.db")
const db = new QuickDB()

module.exports = {
	name: Events.GuildMemberRemove,
	async  execute(member) {
        await db.pull(`optedIn`, member.user.id)
        console.log(`${member.user.username} has left, removing`)
	},
};