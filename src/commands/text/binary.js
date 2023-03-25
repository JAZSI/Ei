const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const Text = require('../../utils/Text');
const txt = new Text();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('binary')
        .setDescription('Convert a text to binary.')
        .addStringOption((option) =>
            option
                .setName('text')
                .setDescription('The text that will be converted')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const text = interaction.options.getString('text');

        const t = txt.binary(text);
        interaction.followUp(t);
    },
};
