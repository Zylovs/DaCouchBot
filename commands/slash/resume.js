import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current song"),

    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply("❌ Nothing is playing.");
        }

        queue.node.setPaused(false);
        interaction.reply("▶ Resumed the player.");
    }
};
