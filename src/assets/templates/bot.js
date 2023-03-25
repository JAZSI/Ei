const {
    Client,
    GatewayIntentBits,
    Events,
    ChannelType,
} = require('discord.js');
require('dotenv').config();

const prefix = '!';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on(Events.ClientReady, () => {
    console.log(`[ CLIENT ] : ${client.user.tag} is online!`);
});

client.on(Events.MessageCreate, (message) => {
    if (message.channel.type !== ChannelType.GuildText) return;

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('pong');
    }

    if (command === 'say') {
        const content = args.join(' ');
        if (!content) {
            return message.channel.send('Please provide a message to send.');
        }
        if (content.includes('<@') || content.includes('<@!')) {
            return message.channel.send(
                "Please don't mention anyone with this command."
            );
        }
        message.delete();
        message.channel.sendTyping();
        setTimeout(() => {
            message.channel.send(content);
        }, 2000);
    }
});

client.login(process.env.DISCORD_TOKEN);
