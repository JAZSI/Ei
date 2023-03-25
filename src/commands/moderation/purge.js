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
        .setName('purge')
        .setDescription('Purges a number of messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption((option) =>
            option
                .setName('amount')
                .setDescription('The amount of messages to purge')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const amount = interaction.options.getInteger('amount');
        if (amount > 100) {
            return interaction.followUp({
                content: "You can't delete more than 100 messages",
            });
        }
        if (amount < 0) {
            return interaction.followUp({
                content: 'You must delete at least one message',
            });
        }
        const messages = await interaction.channel.messages.fetch({
            limit: amount + 1,
        });
        const filtered = messages.filter(
            (msg) => Date.now() - msg.createdTimestamp < ms('14 days')
        );
        await interaction.channel.bulkDelete(filtered);
    },
};
