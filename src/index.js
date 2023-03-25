const {
    Client,
    GatewayIntentBits,
    Collection,
    WebhookClient,
} = require('discord.js');
const config = require('../config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.prefix = new Collection();
client.aliases = new Collection();
client.commands = new Collection();
client.button = new Collection();
client.select = new Collection();
client.modal = new Collection();
client.config = config;

if (process.env.WEBHOOK_URL)
    client.logs = new WebhookClient({ url: process.env.WEBHOOK_URL });

require('./handlers')(client);

client.login(process.env.DISCORD_TOKEN);
