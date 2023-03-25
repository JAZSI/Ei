const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    usage: '',
    description: 'Ping the bot',
    voiceChannel: false,
    nsfw: false,
    disabled: false,
    ownerOnly: false,
    guildOwnerOnly: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array<String>} args
     */
    run: async (client, message, args) => {
        const msg = await message.channel.send('Calculating the ping...');
        const ping = client.ws.ping;
        msg.edit(`Ping: ${ping}ms`);
    },
};
