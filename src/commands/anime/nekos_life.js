const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const { nekos } = require('../../utils/nekos');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nekos_life')
        .setDescription('Get an image from Nekos.life api.')
        .addStringOption((option) =>
            option
                .setName('image')
                .setDescription('What type image do you want to see.')
                .setRequired(true)
                .addChoices(
                    { name: 'smug', value: 'smug' },
                    { name: 'woof', value: 'woof' },
                    { name: 'gasm', value: 'gasm' },
                    { name: '8ball', value: '8ball' },
                    { name: 'goose', value: 'goose' },
                    { name: 'cuddle', value: 'cuddle' },
                    { name: 'avatar', value: 'avatar' },
                    { name: 'slap', value: 'slap' },
                    { name: 'v3', value: 'v3' },
                    { name: 'pat', value: 'pat' },
                    { name: 'gecg', value: 'gecg' },
                    { name: 'feed', value: 'feed' },
                    { name: 'fox_girl', value: 'fox_girl' },
                    { name: 'lizard', value: 'lizard' },
                    { name: 'neko', value: 'neko' },
                    { name: 'hug', value: 'hug' },
                    { name: 'meow', value: 'meow' },
                    { name: 'kiss', value: 'kiss' },
                    { name: 'wallpaper', value: 'wallpaper' },
                    { name: 'tickle', value: 'tickle' },
                    { name: 'spank', value: 'spank' },
                    { name: 'waifu', value: 'waifu' },
                    { name: 'lewd', value: 'lewd' },
                    { name: 'ngif', value: 'ngif' }
                )
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const image = interaction.options.getString('image');
        const result = await nekos(image);
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setImage(result)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
            });
        await interaction.followUp({ embeds: [embed] });
    },
};
