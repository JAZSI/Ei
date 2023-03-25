const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    AttachmentBuilder,
} = require('discord.js');
const chrtr = require('../../utils/character');
const genshindb = require('genshin-db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playable_character')
        .setDescription('Searches for genshin impact character informations')
        .addStringOption((option) =>
            option
                .setName('character')
                .setDescription('The character you want to search for')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('The type of info you want to search for')
                .setRequired(true)
                .addChoices(
                    { name: 'about', value: 'about' },
                    { name: 'talents', value: 'talents' },
                    { name: 'constellation', value: 'constellation' }
                )
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const type = interaction.options.getString('type');
        const character = interaction.options.getString('character');

        const db = genshindb.characters('names', { matchCategories: true });
        if (!db.includes(character)) {
            return interaction.followUp(
                `Available characters: ${db.join(', ')}`
            );
        }

        if (type === 'about') {
            const data = await chrtr(character);
            const attachment = new AttachmentBuilder(data.image, {
                name: 'image.png',
            });
            interaction.followUp({ files: [attachment] });
        } else if (type === 'talents') {
            const data = genshindb.talents(character);

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(data.name)
                .addFields(
                    {
                        name: `${data.combat1.name}`,
                        value: `${data.combat1.info}`,
                        inline: true,
                    },
                    {
                        name: `${data.combat2.name}`,
                        value: `${data.combat2.info}`,
                        inline: true,
                    },
                    {
                        name: `${data.combat3.name}`,
                        value: `${data.combat3.info}`,
                        inline: true,
                    },
                    {
                        name: `${data.passive1.name}`,
                        value: `${data.passive1.info}`,
                        inline: true,
                    },
                    {
                        name: `${data.passive2.name}`,
                        value: `${data.passive2.info}`,
                        inline: true,
                    }
                )
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
                });
            await interaction.followUp({ embeds: [embed] });
        } else if (type === 'constellation') {
            const data = genshindb.constellations(character);

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(data.name)
                .addFields(
                    {
                        name: `${data.c1.name}`,
                        value: `${data.c1.effect}`,
                        inline: true,
                    },
                    {
                        name: `${data.c2.name}`,
                        value: `${data.c2.effect}`,
                        inline: true,
                    },
                    {
                        name: `${data.c3.name}`,
                        value: `${data.c3.effect}`,
                        inline: true,
                    },
                    {
                        name: `${data.c4.name}`,
                        value: `${data.c4.effect}`,
                        inline: true,
                    },
                    {
                        name: `${data.c5.name}`,
                        value: `${data.c5.effect}`,
                        inline: true,
                    },
                    {
                        name: `${data.c6.name}`,
                        value: `${data.c6.effect}`,
                        inline: true,
                    }
                )
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
                });
            await interaction.followUp({ embeds: [embed] });
        }
    },
};
