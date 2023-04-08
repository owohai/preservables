const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const {QuickDB} = require('quick.db')
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async  execute(interaction) {
        if (!interaction.isButton()) return;
        
        if(interaction.customId === `optout.${interaction.user.id}`) {
        if(Array.from(await db.get(`optedIn`)).includes(interaction.user.id) === false || undefined) return;

        await db.pull(`optedIn`, interaction.user.id)

            const row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
					.setCustomId(`optin.${interaction.user.id}`)
					.setLabel('Opt-in')
					.setStyle(ButtonStyle.Success),
			    );

                interaction.user.send({embeds: [new EmbedBuilder().setTitle("Opt-out Success").setDescription(`Dear ${interaction.user.username}, Perservable will not log messages you send. \nYou can still (optionally) opt-in if you wish.`).setColor("DarkGreen")], components: [row]})

        }
	},
};