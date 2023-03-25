const { Client, ButtonInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    id: 'ping',
    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const embed = new EmbedBuilder()
            .setTitle('Ping!')
            .setDescription(`${client.ws.ping}ms`)
            .setColor(client.config.color);
        await interaction.followUp({ embeds: [embed] });
    },
};
