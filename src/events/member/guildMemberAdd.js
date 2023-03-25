const {
    Events,
    Client,
    GuildMember,
    EmbedBuilder,
    AttachmentBuilder,
} = require('discord.js');
const canvas = require('canvas');
const path = require('node:path');

module.exports = {
    name: Events.GuildMemberAdd,
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    run: async (client, member) => {
        const channel = member.guild.channels.cache.find(
            (channel) => channel.name === 'general'
        );
        if (!channel) return;

        function applyText(canvas, text) {
            const context = canvas.getContext('2d');
            let fontSize = 70;

            do {
                context.font = `${(fontSize -= 10)}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 300);

            return context.font;
        }

        const canvasElement = canvas.createCanvas(700, 250);
        const context = canvasElement.getContext('2d');

        const background = await canvas.loadImage(
            path.join(__dirname, '../../assets/Ei.jpg')
        );
        context.drawImage(
            background,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );

        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvasElement.width, canvasElement.height);

        context.font = applyText(canvasElement, `${member.displayName}!`);
        context.fillStyle = '#ffffff';
        context.fillText(
            `${member.displayName}`,
            canvasElement.width / 2.5,
            canvasElement.height / 1.8
        );

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(
            `#${member.user.discriminator}`,
            canvasElement.width / 2.5,
            canvasElement.height / 1.4
        );

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await canvas.loadImage(
            member.user.displayAvatarURL({ format: 'jpg' })
        );
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new AttachmentBuilder(canvasElement.toBuffer(), {
            name: 'welcome.png',
        });

        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setAuthor({
                name: `Welcome to ${member.guild.name}, ${member.displayName}!`,
                iconURL: member.guild.iconURL({ dynamic: true }),
            })
            .setImage('attachment://welcome.png')
            .setTimestamp()
            .setFooter({
                text: `${member.guild.name}`,
                iconURL: member.guild.iconURL({ dynamic: true }),
            });

        channel.send({
            files: [attachment],
            embeds: [embed],
        });
    },
};
