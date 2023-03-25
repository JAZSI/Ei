const { Client, Message, EmbedBuilder } = require('discord.js');
const { deployCommands } = require('../../utils//commands.js');
const path = require('node:path');

module.exports = {
    name: 'deploy',
    aliases: [],
    usage: '[global]',
    description: 'Deploy the application commands',
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
    run: async (client, message, args) => {
        if (args[0] === 'global') {
            deployCommands(
                path.join(__dirname, '../../commands'),
                client.token,
                client.user.id
            );
            message.channel.send(
                'Successfully deployed application commands globally.'
            );
        } else {
            deployCommands(
                path.join(__dirname, '../../commands'),
                client.token,
                client.user.id,
                message.guild.id
            );
            message.channel.send(
                `Successfully deployed application commands in ${message.guild.name}.`
            );
        }
    },
};
