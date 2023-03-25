const {
    PermissionFlagsBits,
    Client,
    ContextMenuCommandInteraction,
    ContextMenuCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new ContextMenuCommandBuilder().setName('userinfo').setType(2),
    /**
     * @param {Client} client
     * @param {ContextMenuCommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const user = await client.users.fetch(interaction.targetId);
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle(`${user.username}#${user.discriminator}`)
            .setThumbnail(user.displayAvatarURL({ size: 2048 }))
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                {
                    name: 'Created at',
                    value: moment.utc(user.createdAt).format('LLLL'),
                    inline: true,
                },
                {
                    name: 'Joined at',
                    value: moment.utc(user.joinedAt).format('LLLL'),
                    inline: true,
                },
                { name: '\u200B', value: '\u200B', inline: true }
            )
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({
                    size: 2048,
                    dynamic: true,
                }),
            });
        return interaction.followUp({ embeds: [embed] });
    },
};
