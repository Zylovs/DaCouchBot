import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause the current song"),

    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.node.isPlaying()) {
            return interaction.reply("❌ Nothing is playing.");
        }

        queue.node.setPaused(true);
        interaction.reply("⏸ Paused the player.");
    }
};
