const { Client, Message, EmbedBuilder } = require('discord.js');
const { deleteCommands } = require('../../utils/commands.js');

module.exports = {
    name: 'delete',
    aliases: [],
    usage: '[global]',
    description: 'Delete the application commands',
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
            deleteCommands(client.token, client.user.id);
            message.channel.send(
                'Successfully deleted application commands globally.'
            );
        } else {
            deleteCommands(client.token, client.user.id, message.guild.id);
            message.channel.send(
                `Successfully deleted application commands in ${message.guild.name}.`
            );
        }
    },
};
