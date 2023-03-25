const { Events, Client } = require('discord.js');

module.exports = {
    name: Events.Error,
    /**
     * @param {Client} client
     * @param {Error} error
     */
    run: async (client, error) => {
        console.error(`[ ERROR ] : ${error}`);
    },
};
