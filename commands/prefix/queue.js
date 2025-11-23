// commands/prefix/queue.js
import { EmbedBuilder } from "discord.js";

export default {
    name: "queue",
    description: "View the current music queue",
    async execute(message) {
        const player = message.client.player;

        // Get queue for this guild
        const queue = player.nodes.get(message.guild.id);

        // No queue or not playing
        if (!queue || !queue.node.isPlaying()) {
            return message.reply("❌ Nothing is currently playing.");
        }

        const currentTrack = queue.currentTrack;
        const tracks = queue.tracks.toArray(); // ensure array

        const queueList = tracks
            .map((track, i) => `${i + 1}. **${track.title}**`)
            .slice(0, 10)
            .join("\n");

        const embed = new EmbedBuilder()
            .setTitle("🎵 Music Queue")
            .setColor(0x1DB954)
            .addFields(
                {
                    name: "Now Playing",
                    value: currentTrack ? `🎶 **${currentTrack.title}**` : "None"
                },
                {
                    name: "Up Next",
                    value: queueList || "Queue is empty"
                }
            );

        message.reply({ embeds: [embed] });
    }
};
