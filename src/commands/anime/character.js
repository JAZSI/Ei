const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Search for a character from an anime')
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('The character you want to search for')
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
            `https://api.jikan.moe/v4/characters?q=${query}&order_by=popularity&sort=asc&limit=20`
        );
        const data = await res.json();
        if (!data.data.length) {
            return interaction.followUp({
                content: 'No results found',
            });
        }
        const character = data.data[0];

        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(character.name)
            .setURL(character.url)
            .setThumbnail(character.images.jpg.image_url)
            .setDescription(character.about)
            .addFields(
                {
                    name: 'Kanji name',
                    value: `${character.name_kanji}`,
                    inline: true,
                },
                {
                    name: 'Nicknames',
                    value: character.nicknames
                        ? character.nicknames.join(', ')
                        : 'None',
                    inline: true,
                },
                {
                    name: 'Favorites',
                    value: `${character.favorites}`,
                    inline: true,
                }
            )
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.followUp({ embeds: [embed] });
    },
};
