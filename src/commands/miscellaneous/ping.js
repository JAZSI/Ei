const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Get the bot's ping"),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle('Ping!')
            .setDescription(`${client.ws.ping}ms`);
        await interaction.followUp({ embeds: [embed] });
    },
};
