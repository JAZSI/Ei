const path = require('node:path');
const fs = require('node:fs');

module.exports = (client) => {
    // Prefix Command Handler
    const prefixPath = path.join(__dirname, 'prefix');
    fs.readdirSync(prefixPath).forEach((dir) => {
        const commands = fs
            .readdirSync(`${prefixPath}/${dir}/`)
            .filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const command = require(`./prefix/${dir}/${file}`);
            command.category = dir;
            client.prefix.set(command.name, command);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) =>
                    client.aliases.set(alias, command.name)
                );
            }
        }
    });

    // Slash Command Handler
    const commandsPath = path.join(__dirname, 'commands');
    fs.readdirSync(commandsPath).forEach((dir) => {
        const commands = fs
            .readdirSync(`${commandsPath}/${dir}/`)
            .filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const command = require(`./commands/${dir}/${file}`);
            command.category = dir;
            if ('data' in command && 'run' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[ WARNING ] : The command at './commands/${dir}/${file}' is missing a required 'data' or 'run' property.`
                );
            }
        }
    });

    // Button Command Handler
    const buttonsPath = path.join(__dirname, 'buttons');
    const buttonFiles = fs
        .readdirSync(buttonsPath)
        .filter((file) => file.endsWith('.js'));

    for (const file of buttonFiles) {
        const filePath = path.join(buttonsPath, file);
        const command = require(filePath);
        if ('id' in command && 'run' in command) {
            client.button.set(command.id, command);
        } else {
            console.log(
                `[ WARNING ] : The command at ${filePath} is missing a required 'id' or 'run' property.`
            );
        }
    }

    // Select Command Handler
    const selectPath = path.join(__dirname, 'select');
    const selectFiles = fs
        .readdirSync(selectPath)
        .filter((file) => file.endsWith('.js'));

    for (const file of selectFiles) {
        const filePath = path.join(selectPath, file);
        const command = require(filePath);
        if ('id' in command && 'run' in command) {
            client.select.set(command.id, command);
        } else {
            console.log(
                `[ WARNING ] : The command at ${filePath} is missing a required 'id' or 'run' property.`
            );
        }
    }

    // Modal Command Handler
    const modalPath = path.join(__dirname, 'modal');
    const modalsFiles = fs
        .readdirSync(modalPath)
        .filter((file) => file.endsWith('.js'));

    for (const file of modalsFiles) {
        const filePath = path.join(modalPath, file);
        const command = require(filePath);
        if ('id' in command && 'run' in command) {
            client.modal.set(command.id, command);
        } else {
            console.log(
                `[ WARNING ] : The command at ${filePath} is missing a required 'id' or 'run' property.`
            );
        }
    }

    // Event Handler
    const eventsPath = path.join(__dirname, 'events');
    fs.readdirSync(eventsPath).forEach((dir) => {
        const events = fs
            .readdirSync(`${eventsPath}/${dir}/`)
            .filter((file) => file.endsWith('.js'));
        for (const file of events) {
            const event = require(`./events/${dir}/${file}`);
            if (event.once) {
                client.once(event.name, event.run.bind(null, client));
            } else {
                client.on(event.name, event.run.bind(null, client));
            }
        }
    });
};
