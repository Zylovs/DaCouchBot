import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the music and clear the queue"),

    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);
        if (!queue || !queue.node.isPlaying()) return interaction.reply("❌ Nothing is playing.");

        queue.delete();
        interaction.reply("🛑 Stopped the player and cleared the queue.");
    }
};
