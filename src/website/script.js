$(function () {
    $.getJSON('prefixcommands', function (prefixData) {
        for (const category in prefixData) {
            let categoryCommands = prefixData[category];
            $('#prefixTable').append(`
            <tr>
            <td>${category.toUpperCase()}</td>
            <td>
                <ul>
                ${categoryCommands
                    .map(
                        (command) =>
                            `<li>${command.name} - ${command.description}</li>`
                    )
                    .join('')}
                </ul>
            </td>
            </tr>
        `);
        }
    });

    $.getJSON('/slashcommands', function (slashData) {
        for (const category in slashData) {
            let categoryCommands = slashData[category];
            $('#slashTable').append(`
            <tr>
            <td>${category.toUpperCase()}</td>
            <td>
                <ul>
                ${categoryCommands
                    .map(
                        (command) =>
                            `<li>${command.name} - ${command.description}</li>`
                    )
                    .join('')}
                </ul>
            </td>
            </tr>
        `);
        }
    });
});
