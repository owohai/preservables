const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const {QuickDB} = require("quick.db")
const db = new QuickDB()

module.exports = {
	name: Events.GuildMemberAdd,
	async  execute(member) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`optin.${member.id}`)
            .setLabel('Opt-in')
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId(`optout.${member.id}`)
            .setLabel('Opt-out')
            .setStyle(ButtonStyle.Danger),
        );
        member.send({embeds:[new EmbedBuilder().setTitle("Opt-in Notification").setDescription(`Dear ${member.user.username}, Perservable asks of you to opt into message logging for archival purposes. Do you agree?`).setFooter({ text: "You messages will not be stored until you opt-in or opt-out."}).setColor('Blurple')], components: [row]}).catch((error) => { console.error(`Could not send message to ${member.user.username} (${member.user.id})`) });
	},
};