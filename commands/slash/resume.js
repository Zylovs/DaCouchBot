import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the paused song"),

    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);
        if (!queue) return interaction.reply("❌ Nothing is playing.");

        queue.node.setPaused(false);
        interaction.reply("▶ Resumed the player.");
    }
};
