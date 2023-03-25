const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const { quotes } = require('../../utils/anime');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('Get a random anime quote.'),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const result = await quotes();
        const embed = new EmbedBuilder()
            .setTitle(`${result.anime} | ${result.character}`)
            .setDescription(result.quote)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
            });
        await interaction.followUp({ embeds: [embed] });
    },
};
