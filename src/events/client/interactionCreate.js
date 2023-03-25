const {
    Events,
    Client,
    CommandInteraction,
    ContextMenuCommandInteraction,
    ButtonInteraction,
    SelectMenuInteraction,
    ModalSubmitInteraction,
} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {Client} client
     * @param { CommandInteraction | ContextMenuCommandInteraction | ButtonInteraction | SelectMenuInteraction | ModalSubmitInteraction } interaction
     */
    run: async (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(
                interaction.commandName
            );
            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                );
                return;
            }
            try {
                await command.run(client, interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        }

        if (interaction.isContextMenuCommand()) {
            const command = interaction.client.commands.get(
                interaction.commandName
            );
            try {
                await command.run(client, interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        }

        if (interaction.isButton()) {
            const command = client.button.get(interaction.customId);
            try {
                command.run(client, interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.customId}`);
                console.error(error);
            }
        }

        if (interaction.isAnySelectMenu()) {
            const command = client.select.get(interaction.customId);
            try {
                command.run(client, interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.customId}`);
                console.error(error);
            }
        }

        if (interaction.isModalSubmit()) {
            const command = client.modal.get(interaction.customId);
            try {
                command.run(client, interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.customId}`);
                console.error(error);
            }
        }
    },
};
