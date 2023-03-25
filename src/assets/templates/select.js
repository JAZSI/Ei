const { Client, SelectMenuInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    id: '',
    /**
     * @param {Client} client
     * @param {SelectMenuInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
    },
};
