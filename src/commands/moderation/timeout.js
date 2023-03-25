const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addMentionableOption((option) =>
            option
                .setName('user')
                .setDescription('The user to timeout from the server')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('duration')
                .setDescription("The duration of the user's timeout")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('The reason to timeout the user')
                .setRequired(false)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const user = interaction.options.getMentionable('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'No reason';

        if (!ms(duration) || ms(duration) > ms('28d')) {
            return interaction.followUp(
                'You cannot timeout a user for more than 30 days.'
            );
        }

        try {
            await user.timeout(ms(duration), reason);
            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle('User Timed out')
                .setDescription(`${user} has been timed out from the server.`)
                .addFields({ name: 'Reason', value: reason })
                .setTimestamp();
            interaction.followUp({ embeds: [embed] });
        } catch (error) {
            interaction.followUp('An error occurred ');
            console.log(error);
        }
    },
};
