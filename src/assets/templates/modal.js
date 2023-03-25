const { Client, ModalSubmitInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    id: '',
    /**
     * @param {Client} client
     * @param {ModalSubmitInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
    },
};
