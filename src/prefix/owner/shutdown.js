const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shutdown',
    aliases: [],
    usage: '',
    description: 'Shutdown the bot',
    botPermissions: [],
    userPermissions: [],
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
        try {
            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle('Shutdown')
                .setDescription('Shutting down...');
            await message.channel.send({ embeds: [embed] });
            process.exit(0);
        } catch (error) {
            console.error(error);
        }
    },
};
