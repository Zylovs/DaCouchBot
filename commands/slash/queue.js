import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("View the current music queue"),

    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.node.isPlaying()) {
            return interaction.reply("❌ Nothing is playing.");
        }

        const currentTrack = queue.currentTrack;

        // v6: queue.tracks is a TrackStore → must use .toArray()
        const tracks = queue.tracks
            .toArray()
            .map((track, i) => `${i + 1}. **${track.title}**`)
            .slice(0, 10)
            .join("\n");

        const embed = new EmbedBuilder()
            .setTitle("🎵 Current Queue")
            .addFields(
                {
                    name: "Now Playing",
                    value: `🎶 **${currentTrack.title}**`
                },
                {
                    name: "Up Next",
                    value: tracks || "No upcoming tracks."
                }
            )
            .setColor(0x1DB954);

        interaction.reply({ embeds: [embed] });
    }
};
