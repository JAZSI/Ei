const {
    PermissionFlagsBits,
    Client,
    ContextMenuCommandInteraction,
    ContextMenuCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder().setName('avatar').setType(2),
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
            .setImage(user.displayAvatarURL({ size: 2048, extension: 'png' }))
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
