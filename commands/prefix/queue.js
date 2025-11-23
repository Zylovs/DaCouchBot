// commands/prefix/queue.js
import { EmbedBuilder } from "discord.js";

export default {
    name: "queue",
    description: "View the current music queue",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply("❌ Nothing is playing.");

        const tracks = queue.tracks.map((t, i) => `${i + 1}. ${t.title}`).slice(0, 10);

        const embed = new EmbedBuilder()
            .setTitle("🎵 Current Queue")
            .setDescription(tracks.join("\n") || "Queue is empty")
            .setColor(0x1DB954);

        message.reply({ embeds: [embed] });
    }
};
