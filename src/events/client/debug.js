const { Events, Client } = require('discord.js');

module.exports = {
    name: Events.Debug,
    /**
     * @param {Client} client
     * @param {String} info
     */
    run: async (client, info) => {
        if (!client.config.debug) return;
        console.log(`[ DEBUG ] : ${info}`);
    },
};
