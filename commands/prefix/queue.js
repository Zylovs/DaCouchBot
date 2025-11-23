import { EmbedBuilder } from "discord.js";

export default {
    name: "queue",
    description: "View the current music queue",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying())
            return message.reply("❌ Nothing is currently playing.");

        const currentTrack = queue.currentTrack;
        const tracks = queue.tracks.toArray(); // convert TrackStore to array

        const queueList = tracks
            .map((track, i) => `${i + 1}. **${track.title}**`)
            .slice(0, 10)
            .join("\n");

        const embed = new EmbedBuilder()
            .setTitle("🎵 Music Queue")
            .setColor(0x1DB954)
            .addFields(
                { name: "Now Playing", value: currentTrack ? `🎶 **${currentTrack.title}**` : "None" },
                { name: "Up Next", value: queueList || "Queue is empty" }
            );

        message.reply({ embeds: [embed] });
    }
};
