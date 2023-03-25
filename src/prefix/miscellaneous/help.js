const {
    Client,
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
    name: 'help',
    aliases: ['h'],
    usage: '[command]',
    description: 'Get help about commands',
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
        const prefix = client.config.prefix;

        const command = args[0];
        if (!command) {
            const prefixCategories = [];
            fs.readdirSync(path.join(__dirname, '../../prefix/')).forEach(
                (dir) => {
                    if (client.config.ignoredCategories.includes(dir)) return;
                    if (!prefixCategories.includes(dir)) {
                        prefixCategories.push(dir);
                    }
                }
            );

            const embed1 = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(`${client.user.username}'s Prefix Commands`)
                .setDescription(
                    `**Prefix:** \`${prefix}\`\nUse \`${prefix}help <command>\` to get more information about a command.\nUsage types: <required>, [optional]`
                )
                .setTimestamp()
                .setFooter({
                    text: `${client.user.username}`,
                    iconURL: client.user.displayAvatarURL(),
                });
            for (const category of prefixCategories) {
                const dirEmojis = `${
                    client.config.category[category]
                } ${category.toUpperCase()}`;
                embed1.addFields({
                    name: dirEmojis,
                    value:
                        '>>> ' +
                        client.prefix
                            .filter((c) => c.category === category)
                            .map((c) => `\`${c.name}\``)
                            .join(', '),
                    inline: true,
                });
            }

            const slashCategories = [];
            fs.readdirSync(path.join(__dirname, '../../commands/')).forEach(
                (dir) => {
                    if (client.config.ignoredCategories.includes(dir)) return;
                    if (!slashCategories.includes(dir)) {
                        slashCategories.push(dir);
                    }
                }
            );

            const embed2 = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(`${client.user.username}'s Slash Commands`)
                .setTimestamp()
                .setFooter({
                    text: `${client.user.username}`,
                    iconURL: client.user.displayAvatarURL(),
                });
            for (const category of slashCategories) {
                const dirEmojis = `${
                    client.config.category[category]
                } ${category.toUpperCase()}`;
                embed2.addFields({
                    name: dirEmojis,
                    value:
                        '>>> ' +
                        client.commands
                            .filter((c) => c.category === category)
                            .map((c) => `\`${c.data.name}\``)
                            .join(', '),
                    inline: true,
                });
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('ping')
                    .setLabel('Ping')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel('Source')
                    .setStyle(ButtonStyle.Link)
                    .setURL(client.config.sourceURL),
                new ButtonBuilder()
                    .setLabel('Invite')
                    .setStyle(ButtonStyle.Link)
                    .setURL(client.config.inviteURL),
                new ButtonBuilder()
                    .setLabel('Support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(client.config.supportURL),
                new ButtonBuilder()
                    .setLabel('Website')
                    .setStyle(ButtonStyle.Link)
                    .setURL(client.config.websiteURL)
            );
            message.channel.send({
                embeds: [embed1, embed2],
                components: [row],
            });
        } else {
            const cmd =
                client.prefix.get(command) ||
                client.prefix.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(command)
                );
            if (!cmd) {
                return message.channel.send("That command doesn't exist.");
            }
            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setTitle(`Command: ${cmd.name}`)
                .setDescription(cmd.description || 'No description provided.')
                .addFields(
                    {
                        name: 'Aliases',
                        value:
                            cmd.aliases.length > 0
                                ? cmd.aliases.map((a) => `\`${a}\``).join(', ')
                                : 'None',
                        inline: true,
                    },
                    { name: 'Category', value: cmd.category, inline: true },
                    {
                        name: 'Usage',
                        value: `\`${prefix}${cmd.name} ${cmd.usage || ''}\``,
                        inline: true,
                    },
                    {
                        name: 'Voice Channel',
                        value: cmd.voiceChannel ? 'Yes' : 'No',
                        inline: true,
                    },
                    {
                        name: 'NSFW',
                        value: cmd.nsfw ? 'Yes' : 'No',
                        inline: true,
                    },
                    {
                        name: 'Disabled',
                        value: cmd.disabled ? 'Yes' : 'No',
                        inline: true,
                    },
                    {
                        name: 'Owner Only',
                        value: cmd.ownerOnly ? 'Yes' : 'No',
                        inline: true,
                    },
                    {
                        name: 'Guild Owner Only',
                        value: cmd.guildOwnerOnly ? 'Yes' : 'No',
                        inline: true,
                    },
                    { name: '\u200B', value: '\u200B', inline: true }
                )
                .setTimestamp()
                .setFooter({
                    text: `${client.user.username}`,
                    iconURL: client.user.avatarURL(),
                });
            return message.channel.send({ embeds: [embed] });
        }
    },
};
