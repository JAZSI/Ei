const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const { anime } = require('../../utils/anime.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Search for an anime.')
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('What anime do you want to search for.')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const query = interaction.options.getString('query');
        const result = await anime(query);
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(result.attributes.canonicalTitle)
            .setURL(result.links.self)
            .setDescription(result.attributes.synopsis)
            .addFields(
                {
                    name: 'Type',
                    value: '' + result.attributes.subtype,
                    inline: true,
                },
                {
                    name: 'Status',
                    value: '' + result.attributes.status,
                    inline: true,
                },
                {
                    name: 'Episodes',
                    value: '' + result.attributes.episodeCount,
                    inline: true,
                },
                {
                    name: 'Rating',
                    value: '' + result.attributes.averageRating,
                    inline: true,
                },
                {
                    name: 'Age Rating',
                    value: '' + result.attributes.ageRating,
                    inline: true,
                },
                { name: '\u200B', value: '\u200B', inline: true }
            )
            .setImage(result.attributes.coverImage.original)
            .setThumbnail(result.attributes.posterImage.original)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
            });
        await interaction.followUp({ embeds: [embed] });
    },
};
