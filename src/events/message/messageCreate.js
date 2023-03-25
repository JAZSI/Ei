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

        const prefix = client.config.prefix;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        const command =
            client.prefix.get(cmd) ||
            client.prefix.get(client.aliases.get(cmd));
        if (!command) return;

        // Voice channel
        if (command.voiceChannel && message.member.voice.channel === null) {
            return message.channel.send(
                'You need to be in a voice channel to execute this command!'
            );
        }

        // Channel is nsfw
        if (command.nsfw && !message.channel.nsfw) {
            return message.channel.send(
                'This command is only available in nsfw channels!'
            );
        }

        // Command is disabled
        if (command.disabled) {
            return message.channel.send('This command is disabled!');
        }

        // Command is owner only
        if (command.ownerOnly && message.author.id !== client.config.ownerID) {
            return message.channel.send('This command is owner only!');
        }

        // Command is guild owner only
        const owner = await message.guild.fetchOwner();
        if (command.guildOwnerOnly && message.author.id !== owner.id) {
            return message.channel.send('This command is guild owner only!');
        }

        // Run command
        try {
            command.run(client, message, args);
        } catch (error) {
            console.log(error);
        }
    },
};
