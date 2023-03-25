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
        .setName('owoifier')
        .setDescription('OwOify a text.')
        .addStringOption((option) =>
            option
                .setName('text')
                .setDescription('The text that will be owoified')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const text = interaction.options.getString('text');

        const t = txt.owoifier(text);
        interaction.followUp(t);
    },
};
