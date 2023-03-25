const {
    Client,
    ContextMenuCommandInteraction,
    ContextMenuCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder().setName('').setType(2),
    /**
     * @param {Client} client
     * @param {ContextMenuCommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
    },
};
