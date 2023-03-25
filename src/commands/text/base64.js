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
        .setName('base64')
        .setDescription('Encode/Decode a text from base64.')
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Type of convertion')
                .setRequired(true)
                .addChoices(
                    { name: 'Encode', value: 'Encode' },
                    { name: 'Decode', value: 'Decode' }
                )
        )
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
        const type = interaction.options.getString('type');
        const text = interaction.options.getString('text');

        if (type === 'Encode') {
            const t = txt.base64Encode(text);
            interaction.followUp(t);
        } else if (type === 'Decode') {
            const t = txt.base64Decode(text);
            interaction.followUp(t);
        }
    },
};
