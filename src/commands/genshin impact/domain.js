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
        .setName('domain')
        .setDescription('Searches for genshin impact domain informations')
        .addStringOption((option) =>
            option
                .setName('region')
                .setDescription('The region of info you want to search for')
                .setRequired(true)
                .addChoices(
                    { name: 'Mondstat', value: 'Mondstat' },
                    { name: 'Liyue', value: 'Liyue' },
                    { name: 'Inazuma', value: 'Inazuma' },
                    { name: 'Sumeru', value: 'Sumeru' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('domain')
                .setDescription('The domain you want to search for')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const region = interaction.options.getString('region');
        const domain = interaction.options.getString('domain');

        const db = genshindb.domains(region, { matchCategories: true });
        if (!db.includes(domain)) {
            return interaction.followUp(`Available domains: ${db.join(', ')}`);
        }
        const data = genshindb.domains(domain);

        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(data.name)
            .setDescription(data.description)
            .addFields(
                {
                    name: 'Domain Entrance',
                    value: data.domainentrance,
                    inline: true,
                },
                { name: 'Comain Type', value: data.domaintype, inline: true },
                {
                    name: 'Recommended Level',
                    value: data.recommendedlevel,
                    inline: true,
                },
                { name: 'Unlock Rank', value: data.unlockrank, inline: true },
                {
                    name: 'Disorder',
                    value: data.disorder.join('\n'),
                    inline: true,
                },
                {
                    name: 'Monster List',
                    value: data.monsterlist.join('\n'),
                    inline: true,
                }
            )
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
            });
        await interaction.followUp({ embeds: [embed] });
    },
};
