const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const {QuickDB} = require("quick.db")
const db = new QuickDB()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('privacy')
		.setDescription('Gives you more information about preservables.'),
	async execute(interaction) {
		await interaction.deferReply();

        //console.log(await  db.get(`c.${interaction.channel.id}`))

        // do db stuff
		await interaction.editReply({ embeds: [new EmbedBuilder().setTitle('More about Preservable\s privacy').setDescription("Preservable doesn't and WILL not collect the following: **Administrative Actions**, **Messages** (once deleted).\n\nPreservable collects the following: **Profile Picture**, **Messages you send**, **Messges you react to**, **Messages you edit**. Once a Message you send is deleted, it will also reflect on Preservable's archive.\n\nAdditonally, Preservable will immediately **drop** any incoming messages/actions it recieves (and also dumps it from the memory) if you do did **NOT** consent to message logging. Once you opt-out, all the messages/actions you have ever done will be destoryed and will no longer be restorable once you opt back in. If you leave the custom server event, you will be automatically optted-out.").setColor("DarkGrey")]});
	},
};