const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const genshindb = require('genshin-db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('artifact')
        .setDescription('Searches for genshin impact artifact informations')
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('The type of artifact you want to search for')
                .setRequired(true)
                .addChoices(
                    { name: 'Flower', value: 'Flower' },
                    { name: 'Plume', value: 'Plume' },
                    { name: 'Sands', value: 'Sands' },
                    { name: 'Goblet', value: 'Goblet' },
                    { name: 'Circlet', value: 'Circlet' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('rarity')
                .setDescription('The rarity of the artifact')
                .setRequired(true)
                .addChoices(
                    { name: '3 Star', value: '3' },
                    { name: '4 Star', value: '4' },
                    { name: '5 Star', value: '5' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('artifact')
                .setDescription('The artifact to search for')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const type = interaction.options.getString('type');
        const rarity = interaction.options.getString('rarity');
        const artifact = interaction.options.getString('artifact');

        const db = genshindb.artifacts(rarity, { matchCategories: true });
        if (!db.includes(artifact)) {
            return interaction.followUp(
                `Available ${rarity} Star artifacts: ${db.join(', ')}`
            );
        }
        const adb = genshindb.artifacts(artifact);
        let data;
        let image;
        if (type === 'Flower') {
            data = adb.flower;
            image = adb.images.flower;
        }
        if (type === 'Plume') {
            data = adb.plume;
            image = adb.images.plume;
        }
        if (type === 'Sands') {
            data = adb.sands;
            image = adb.images.sands;
        }
        if (type === 'Goblet') {
            data = adb.goblet;
            image = adb.images.goblet;
        }
        if (type === 'Circlet') {
            data = adb.circlet;
            image = adb.images.circlet;
        }
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(data.name)
            .setThumbnail(image)
            .setDescription(data.story)
            .addFields(
                { name: 'Relic Type', value: data.relictype, inline: true },
                { name: 'Description', value: data.description, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Rarity', value: adb.rarity.join(', '), inline: true },
                { name: '2pc Artifact Set', value: adb['2pc'], inline: true },
                { name: '4pc Artifact Set', value: adb['4pc'], inline: true }
            )
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
            });
        await interaction.followUp({ embeds: [embed] });
    },
};
