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
        .setName('weapon')
        .setDescription('Searches for genshin impact weapon informations')
        .addStringOption((option) =>
            option
                .setName('weapon')
                .setDescription('The weapon you want to search for')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const weapon = interaction.options.getString('weapon').toLowerCase();

        const db = genshindb.weapons('names', { matchCategories: true });
        const CHUNK_SIZE = 100;

        if (!db.includes(weapon)) {
            const chunks = [];
            for (let i = 0; i < db.length; i += CHUNK_SIZE) {
                chunks.push(db.slice(i, i + CHUNK_SIZE));
            }
            chunks.forEach((chunk) => {
                interaction.followUp(`Available weapons: ${chunk.join(', ')}`);
            });
            return;
        }
        const data = genshindb.weapons(weapon);

        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(data.name)
            .setDescription(data.story)
            .addFields(
                { name: 'Description', value: data.description, inline: true },
                { name: 'Weapon type', value: data.weapontype, inline: true },
                { name: 'Rarity', value: data.rarity, inline: true },
                { name: data.effectname, value: data.effect, inline: true }
            )
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
            });
        await interaction.followUp({ embeds: [embed] });
    },
};
