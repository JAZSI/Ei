const { REST, Routes } = require('discord.js');
const glob = require('glob');

/**
 * Deploys the commands in the specified path to the specified Discord client.
 * @param {string} cmdPath - The path to the directory containing the commands.
 * @param {string} token - The token to use to authenticate the request.
 * @param {string} clientId - The ID of the Discord client.
 * @param {string} [guildId] - The ID of the guild to deploy the commands to. If not provided, the commands will be deployed globally.
 */
function deployCommands(cmdPath, token, clientId, guildId) {
    const commands = [];
    const commandFiles = glob.sync(`${cmdPath}/**/*.js`);

    for (const file of commandFiles) {
        const command = require(require.resolve(file));
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {
            console.log(
                `[ COMMANDS ] : Started refreshing ${commands.length} application (/) commands.`
            );

            if (guildId) {
                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands }
                );
                console.log(
                    `[ COMMANDS ] : Successfully reloaded ${data.length} application (/) commands in ${guildId}.`
                );
            } else {
                const data = await rest.put(
                    Routes.applicationCommands(clientId),
                    {
                        body: commands,
                    }
                );
                console.log(
                    `[ COMMANDS ] : Successfully reloaded ${data.length} application (/) commands globally.`
                );
            }
        } catch (error) {
            console.error(error);
        }
    })();
}

/**
 * Deletes all application or guild commands for the specified Discord client.
 * @param {string} token - The token to use to authenticate the request.
 * @param {string} clientId - The ID of the Discord client.
 * @param {string} [guildId] - The ID of the guild to delete the commands from. If not provided, all global commands will be deleted.
 */
function deleteCommands(token, clientId, guildId) {
    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {
            if (guildId) {
                rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                    body: [],
                })
                    .then(() =>
                        console.log(
                            `[ COMMANDS ] : Successfully deleted all application commands in ${guildId}.`
                        )
                    )
                    .catch(console.error);
            } else {
                rest.put(Routes.applicationCommands(clientId), { body: [] })
                    .then(() =>
                        console.log(
                            '[ COMMANDS ] : Successfully deleted all application commands.'
                        )
                    )
                    .catch(console.error);
            }
        } catch (error) {
            console.error(error);
        }
    })();
}

module.exports = { deployCommands, deleteCommands };
