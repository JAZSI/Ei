const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const { WaifuPics } = require('../../utils/WaifuPics');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu_pics')
        .setDescription('Get an image from Waifu Pics api.')
        .addStringOption((option) =>
            option
                .setName('image')
                .setDescription('What type image do you want to see.')
                .setRequired(true)
                .setChoices(
                    { name: 'waifu', value: 'waifu' },
                    { name: 'neko', value: 'neko' },
                    { name: 'shinobu', value: 'shinobu' },
                    { name: 'megumin', value: 'megumin' },
                    { name: 'hug', value: 'hug' },
                    { name: 'awoo', value: 'awoo' },
                    { name: 'kiss', value: 'kiss' },
                    { name: 'pat', value: 'pat' },
                    { name: 'smug', value: 'smug' },
                    { name: 'bonk', value: 'bonk' },
                    { name: 'yeet', value: 'yeet' },
                    { name: 'blush', value: 'blush' },
                    { name: 'smile', value: 'smile' },
                    { name: 'wave', value: 'wave' },
                    { name: 'highfive', value: 'highfive' },
                    { name: 'handhold', value: 'handhold' },
                    { name: 'nom', value: 'nom' },
                    { name: 'bite', value: 'bite' },
                    { name: 'glomp', value: 'glomp' },
                    { name: 'slap', value: 'slap' },
                    { name: 'happy', value: 'happy' },
                    { name: 'wink', value: 'wink' },
                    { name: 'poke', value: 'poke' },
                    { name: 'dance', value: 'dance' }
                )
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const image = interaction.options.getString('image');
        const waifu = new WaifuPics('sfw');
        const result = await waifu.getImage(image);
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
