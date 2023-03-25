const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Get a random anime/manga/character')
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Type of data to get from')
                .setRequired(true)
                .setChoices(
                    {
                        name: 'Anime',
                        value: 'anime',
                    },
                    {
                        name: 'Manga',
                        value: 'manga',
                    },
                    {
                        name: 'Character',
                        value: 'character',
                    }
                )
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const type = interaction.options.getString('type');

        if (type === 'anime') {
            const res = await fetch(`https://api.jikan.moe/v4/random/anime`);
            const data = await res.json();
            const anime = data.data;

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(anime.title)
                .setURL(anime.url)
                .setThumbnail(anime.images.jpg.large_image_url)
                .setDescription(anime.synopsis)
                .addFields(
                    {
                        name: 'Episodes',
                        value: `${anime.episodes}`,
                        inline: true,
                    },
                    {
                        name: 'Rating',
                        value: `${anime.status}`,
                        inline: true,
                    },
                    {
                        name: 'Season',
                        value: `${anime.season}`,
                        inline: true,
                    },
                    {
                        name: 'Rank',
                        value: `${anime.rank}`,
                        inline: true,
                    },
                    {
                        name: 'Popularity',
                        value: `${anime.popularity}`,
                        inline: true,
                    },
                    {
                        name: 'Start Date',
                        value: `${anime.aired.string}`,
                        inline: true,
                    }
                )
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();

            await interaction.followUp({ embeds: [embed] });
        } else if (type === 'manga') {
            const res = await fetch(`https://api.jikan.moe/v4/random/manga`);
            const data = await res.json();
            const manga = data.data;

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(manga.title)
                .setURL(manga.url)
                .setThumbnail(manga.images.jpg.large_image_url)
                .setDescription(manga.synopsis)
                .addFields(
                    {
                        name: 'Volumes',
                        value: `${manga.volumes}`,
                        inline: true,
                    },
                    {
                        name: 'Chapters',
                        value: `${manga.chapters}`,
                        inline: true,
                    },
                    {
                        name: 'Status',
                        value: `${manga.status}`,
                        inline: true,
                    },
                    {
                        name: 'Rank',
                        value: `${manga.rank}`,
                        inline: true,
                    },
                    {
                        name: 'Popularity',
                        value: `${manga.popularity}`,
                        inline: true,
                    },
                    {
                        name: 'Published',
                        value: `${manga.published.string}`,
                        inline: true,
                    }
                )
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp();

            await interaction.followUp({ embeds: [embed] });
        } else if (type === 'character') {
            const res = await fetch(
                `https://api.jikan.moe/v4/random/characters`
            );
            const data = await res.json();
            const character = data.data;

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
        }
    },
};
