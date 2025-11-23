import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Change the player volume (0–100)")
        .addIntegerOption(option =>
            option.setName("amount")
                .setDescription("Volume level")
                .setRequired(true)
        ),

    async execute(interaction) {
        const volume = interaction.options.getInteger("amount");

        if (volume < 0 || volume > 100)
            return interaction.reply("❌ Volume must be between **0 and 100**.");

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack)
            return interaction.reply("❌ Nothing is playing.");

        queue.node.setVolume(volume);
        interaction.reply(`🔊 Volume set to **${volume}%**`);
    }
};
