import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sends an embed example"),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Example Embed")
            .setDescription("This is a description inside an embed.")
            .setColor(0x00ffcc)
            .addFields(
                { name: "Field 1", value: "Some text here", inline: true },
                { name: "Field 2", value: "More text here", inline: true }
            )
            .setFooter({ text: "Footer Text" })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
