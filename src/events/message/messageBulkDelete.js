const { Events, Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageBulkDelete,
    /**
     * @param {Client} client
     * @param {Message[]} messages
     */
    run: async (client, messages) => {
        if (!process.env.WEBHOOK_URL) return;
        const embed = new EmbedBuilder()
            .setTitle('Messages deleted')
            .setColor(client.config.color)
            .setDescription(
                messages
                    .map(
                        (message) =>
                            `[${message.author.tag}] : ${message.content}`
                    )
                    .join('\n')
            )
            .setTimestamp();
        await client.logs.send({ embeds: [embed] });
    },
};
