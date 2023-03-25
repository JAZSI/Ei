const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('producers')
        .setDescription('Search for producers')
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('The producer you want to search for')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const query = interaction.options.getString('query');

        const res = await fetch(
            `https://api.jikan.moe/v4/producers?q=${query}&order_by=established&sort=asc&limit=20`
        );
        const data = await res.json();
        if (!data.data.length) {
            return interaction.followUp({
                content: 'No results found',
            });
        }
        const producers = data.data[0];

        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(producers.titles[0].title)
            .setURL(producers.url)
            .setThumbnail(producers.images.jpg.image_url)
            .setDescription(producers.about)
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.followUp({ embeds: [embed] });
    },
};
