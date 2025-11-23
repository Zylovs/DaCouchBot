// commands/slash/skip.js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),

    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply("❌ Nothing is playing.");

        queue.node.skip();

        interaction.reply("⏭ Skipped the current song.");
    }
};
