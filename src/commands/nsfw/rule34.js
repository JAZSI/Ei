const {
    PermissionFlagsBits,
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');
const { rule34 } = require('../../utils/Booru');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rule34')
        .setDescription('Retrieve images from Rule 34')
        .addStringOption((option) =>
            option
                .setName('tags')
                .setDescription('Tags to search for')
                .setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();
        const tags = interaction.options.getString('tags');

        if (client.config.enableNSFW && !interaction.channel.nsfw) {
            return interaction.followUp({
                content: 'This command is only available in nsfw channels!',
            });
        }

        const tagsArray = tags.split(' ');
        const data = await rule34({
            tags: tagsArray,
            limit: 100,
        });

        if (data.length === 0) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(
                    'No results found. Please try again with a different tag.'
                )
                .setTimestamp();
            await interaction.followUp({ embeds: [embed] });
            return;
        }
        const post = data[Math.floor(Math.random() * data.length)];
        const embed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle('Rule 34')
            .setDescription(`**Tags:** ${post.tags}`)
            .setImage(post.file_url)
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();
        await interaction.followUp({ embeds: [embed] });
    },
};
