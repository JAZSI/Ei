const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Make a poll about something')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption((option) =>
            option
                .setName('question')
                .setDescription('The question to the poll')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const question = interaction.options.getString('question');

        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle('Poll')
            .setDescription(question)
            .setTimestamp();

        const i = await interaction.followUp({ embeds: [embed] });
        await i.react('✅');
        await i.react('❌');
    },
};
