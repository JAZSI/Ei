const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    WebhookClient,
} = require('discord.js');
const { isValidHttpUrl, isDiscordWebhookUrl } = require('../../utils/URL');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('webhook')
        .setDescription('Sends a message through a webhook.')
        .addStringOption((option) =>
            option
                .setName('webhook')
                .setDescription('webhook url')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('message')
                .setDescription('message content')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const webhook = interaction.options.getString('webhook');
        const message = interaction.options.getString('message');

        if (isValidHttpUrl(webhook) === false) {
            return await interaction.followUp({ content: 'Invalid url' });
        }
        if (isDiscordWebhookUrl(webhook) === false) {
            return await interaction.followUp({
                content: 'Please provide a valid webhook url',
            });
        }

        try {
            const webhookClient = new WebhookClient({ url: webhook });
            webhookClient.send({ content: message });
            return await interaction.followUp({
                content: 'Message successfully sent!',
            });
        } catch (error) {
            return await interaction.followUp({
                content: 'An error occured while sending the message',
            });
        }
    },
};
