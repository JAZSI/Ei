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
        .setName('material')
        .setDescription('Searches for genshin impact material informations')
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('The type of info you want to search for')
                .setRequired(true)
                .addChoices(
                    { name: 'talent', value: 'talent' },
                    { name: 'fish', value: 'fish' },
                    { name: 'weapon', value: 'weapon' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('material')
                .setDescription('The material you want to search for')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const type = interaction.options.getString('type');
        const material = interaction.options.getString('material');

        if (type === 'talent') {
            const db = genshindb.materials('talent material', {
                matchCategories: true,
            });
            if (!db.includes(material)) {
                return interaction.followUp(
                    `Available materials: ${db.join(', ')}`
                );
            }
            const data = genshindb.materials(material);

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(data.name)
                .setDescription(data.description)
                .setThumbnail(data.images.redirect)
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
                });
            await interaction.followUp({ embeds: [embed] });
        } else if (type === 'fish') {
            const db = genshindb.materials('fish', {
                matchNames: false,
                matchCategories: true,
            });
            if (!db.includes(material)) {
                return interaction.followUp(
                    `Available materials: ${db.join(', ')}`
                );
            }
            const data = genshindb.materials(material);

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(data.name)
                .setDescription(data.description)
                .setThumbnail(data.images.redirect)
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
                });
            await interaction.followUp({ embeds: [embed] });
        } else if (type === 'weapon') {
            const db = genshindb.materials('weapon material', {
                matchCategories: true,
            });
            if (!db.includes(material)) {
                return interaction.followUp(
                    `Available materials: ${db.join(', ')}`
                );
            }
            const data = genshindb.materials(material);

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(data.name)
                .setDescription(data.description)
                .setThumbnail(data.images.redirect)
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
                });
            await interaction.followUp({ embeds: [embed] });
        }
    },
};
