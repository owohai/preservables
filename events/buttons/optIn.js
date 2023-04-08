const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async  execute(interaction) {
        if (!interaction.isButton()) return;

        if(interaction.customId === `optin.${interaction.user.id}`) {
        if(db.has(`optedIn`, interaction.user.id) === true || undefined) return;

        await db.push(`optedIn`, interaction.user.id)
            const row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
					.setCustomId(`optout.${interaction.user.id}`)
					.setLabel('Opt-out')
					.setStyle(ButtonStyle.Danger),
			    );

                interaction.user.send({embeds:[new EmbedBuilder().setTitle("Opt-in Success").setDescription(`Dear ${interaction.user.username}, Perservable will now start to log messages you send. \nYou can still (optionally) opt-out if you wish. Once you opt out, all the data we have on you would be deleted.`).setColor('DarkGreen')], components: [row]})
        }
	},
};