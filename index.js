const { ShardingManager } = require('discord.js');
const path = require('node:path');

const config = require('./config.json');
require('dotenv').config();

const bot = path.join(__dirname, 'src/index.js');

if (config.shard) {
    const manager = new ShardingManager(bot, {
        token: process.env.DISCORD_TOKEN,
    });
    manager.on('shardCreate', (shard) =>
        console.log(`[ SHARD ] : Launched shard ${shard.id}`)
    );
    manager.spawn();
} else {
    require(bot);
}

process.on('unhandledRejection', (error, promise) => {
    console.error(`Unhandled rejection: ${error.message}`);
    console.error(promise);
});
