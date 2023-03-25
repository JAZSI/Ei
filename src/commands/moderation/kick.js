const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addMentionableOption((option) =>
            option
                .setName('user')
                .setDescription('The user to kick from the server')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('The reason to kick the user')
                .setRequired(false)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const user = interaction.options.getMentionable('user');
        const reason = interaction.options.getString('reason') || 'No reason';

        try {
            await user.kick({ reason: reason });
            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle('User kicked')
                .setDescription(`${user} has been kicked from the server.`)
                .addFields({ name: 'Reason', value: reason })
                .setTimestamp();
            interaction.followUp({ embeds: [embed] });
        } catch (error) {
            interaction.followUp('An error occurred ');
            console.log(error);
        }
    },
};
