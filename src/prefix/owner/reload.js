const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'reload',
    aliases: [],
    usage: '<category> <command>',
    description: 'Reloads all commands',
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
        const category = args[0].toLowerCase();
        const command = args[1].toLowerCase();
        if (!category || !command) {
            return message.channel.send(
                'Please provide a category and command name to reload.'
            );
        }

        try {
            const commandPath = `../../prefix/${category}/${command}.js`;
            delete require.cache[require.resolve(commandPath)];
            client.prefix.delete(command);

            const pull = require(commandPath);
            client.prefix.set(command, pull);

            return message.channel.send(`Reloaded Command: **\`${command}\`**`);
        } catch (error) {
            return message.reply(
                ` Cannot reload \`${command}\` from \`${category}\`\n\`\`\`${error}\`\`\``
            );
        }
    },
};
