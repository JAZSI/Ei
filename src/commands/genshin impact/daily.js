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
        .setName('daily')
        .setDescription('Show the daily domains and materials.'),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const today = new Date();
        const dayOfWeek = daysOfWeek[today.getDay()];

        const material = genshindb.materials(dayOfWeek, {
            matchCategories: true,
        });
        const domain = genshindb.domains(dayOfWeek, { matchCategories: true });

        const embed1 = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(`${dayOfWeek} Materials`);
        const embed2 = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(`${dayOfWeek} Open Domains`);

        if (dayOfWeek === 'Sunday') {
            embed1.setDescription('All Domain Materials are available');
            embed2.setDescription('All Domains are available');
        } else {
            embed1.setDescription(material.join('\n'));
            embed2.setDescription(domain.join('\n'));
        }

        interaction.followUp({ embeds: [embed1, embed2] });
    },
};
