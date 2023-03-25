const { Client, ButtonInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    id: '',
    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
    },
};
