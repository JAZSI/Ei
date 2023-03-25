const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: '',
    aliases: [],
    usage: '',
    description: '',
    voiceChannel: false,
    nsfw: false,
    disabled: false,
    ownerOnly: true,
    guildOwnerOnly: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array<String>} args
     */
    run: async (client, message, args) => {},
};
