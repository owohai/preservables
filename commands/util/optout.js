const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const {QuickDB} = require("quick.db")
const db = new QuickDB()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('optout')
		.setDescription('Facilitates the optting-out of message logging.'),
	async execute(interaction) {
		await interaction.deferReply();

        // do db stuff

        if(Array.from(await db.get(`optedIn`)).includes(interaction.user.id) === false || undefined) return;

        await db.pull(`optedIn`, interaction.user.id)

            const row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
					.setCustomId(`optin.${interaction.user.id}`)
					.setLabel('Opt-in')
					.setStyle(ButtonStyle.Success),
			    );

                await interaction.editReply({embeds: [new EmbedBuilder().setTitle("Opt-out Success").setDescription(`Dear ${interaction.user.username}, Perservable will not log messages you send. \nYou can still (optionally) opt-in if you wish.`).setColor("DarkGreen")], components: [row], ephemeral: true})
        },
};