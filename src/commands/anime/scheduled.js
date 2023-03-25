const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('scheduled')
        .setDescription('Get the scheduled animes for today'),
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
        const res = await fetch(
            `https://api.jikan.moe/v4/schedules?filter=${dayOfWeek.toLowerCase()}&limit=20`
        );
        const data = await res.json();
        if (!data.data.length) {
            return interaction.followUp({
                content: 'No results found',
            });
        }
        const animes = data.data;
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(`${dayOfWeek} animes`)
            .setDescription(animes.map((anime) => anime.title).join('\n'))
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.followUp({ embeds: [embed] });
    },
};
