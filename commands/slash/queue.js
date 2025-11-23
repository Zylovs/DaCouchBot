import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("View the current music queue"),

    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);
        if (!queue || !queue.node.isPlaying()) return interaction.reply("❌ Nothing is playing.");

        const tracks = queue.tracks.map((t, i) => `${i + 1}. ${t.title}`).slice(0, 10);
        const embed = new EmbedBuilder()
            .setTitle("🎵 Current Queue")
            .setDescription(tracks.join("\n"))
            .setColor(0x1DB954);

        interaction.reply({ embeds: [embed] });
    }
};
