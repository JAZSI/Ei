const {
    Events,
    Client,
    Message,
    EmbedBuilder,
    AttachmentBuilder,
} = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {
        if (!process.env.WEBHOOK_URL) return;
        const embed = new EmbedBuilder()
            .setTitle('Message deleted')
            .setColor(client.config.color)
            .setDescription(
                `Message by \`${message.author.tag}\` deleted in \`#${message.channel.name}\`, \`${message.guild.name}\``
            )
            .addFields({
                name: 'Message content',
                value: '' + message.content || 'No message content',
            })
            .setTimestamp();
        if (
            message.attachments.size > 0 &&
            message.attachments.first().height
        ) {
            const attachment = new AttachmentBuilder(
                message.attachments.first().url,
                { name: 'deleted.png' }
            );
            embed.setImage('attachment://deleted.png');
            await client.logs.send({
                embeds: [embed],
                files: [attachment],
            });
            return;
        } else if (message.attachments.size > 0) {
            const type = message.attachments.first().url.split('.').pop();
            const attachment = new AttachmentBuilder(
                message.attachments.first().url,
                { name: `deleted.${type}` }
            );
            await client.logs.send({ embeds: [embed] }).then(async () => {
                client.logs.send({ files: [attachment] });
            });
            return;
        }
        await client.logs.send({ embeds: [embed] });
    },
};
