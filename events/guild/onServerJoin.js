const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
	name: Events.GuildCreate,
	async  execute(guild) {
        guild.members.fetch({}).then(fetchedMembers => {
            fetchedMembers.each(member => {
                if(member.user.bot === true) return; //console.log("this was a bot")
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
              });              
        });
	},
};