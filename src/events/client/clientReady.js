const { Events, Client, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * @param {Client} client
     */
    run: async (client) => {
        console.log(`[ CLIENT ] : ${client.user.tag} is online!`);
        client.user.setPresence({
            activities: [
                {
                    name: 'you',
                    type: ActivityType.Watching,
                },
            ],
            status: 'dnd',
        });
    },
};
