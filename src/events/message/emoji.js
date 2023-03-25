const { Events, Client, Message, ChannelType } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {
        if (message.channel.type !== ChannelType.GuildText) return;
        if (message.author.bot || message.webhookId) return;
        let msg = message.content;

        const emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
        if (!emojis) return;
        emojis.forEach((m) => {
            const emoji = client.emojis.cache.find((x) => x.name === m);
            if (!emoji) return;
            const temp = emoji.toString();
            if (new RegExp(temp, 'g').test(msg)) {
                msg = msg.replace(new RegExp(temp, 'g'), emoji.toString());
            } else {
                msg = msg.replace(
                    new RegExp(':' + m + ':', 'g'),
                    emoji.toString()
                );
            }
        });

        if (msg === message.content) return;

        let webhook = await message.channel.fetchWebhooks();
        webhook = webhook.find((x) => x.name === client.user.username);

        if (!webhook) {
            webhook = await message.channel.createWebhook({
                name: client.user.username,
                avatar: client.user.displayAvatarURL({ dynamic: false }),
            });
        }

        await webhook.edit({
            name: message.member.nickname
                ? message.member.nickname
                : message.author.username,
            avatar: message.author.displayAvatarURL({ dynamic: false }),
        });

        message.delete();
        webhook.send(msg);

        await webhook.edit({
            name: client.user.username,
            avatar: client.user.displayAvatarURL({ dynamic: false }),
        });
    },
};
