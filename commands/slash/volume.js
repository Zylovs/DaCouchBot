import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Change the player volume")
        .addIntegerOption(option =>
            option.setName("amount")
                .setDescription("Volume 0-100")
                .setRequired(true)
        ),

    async execute(interaction) {
        const volume = interaction.options.getInteger("amount");
        const queue = interaction.client.player.nodes.get(interaction.guild.id);
        if (!queue) return interaction.reply("❌ Nothing is playing.");

        queue.node.setVolume(volume);
        interaction.reply(`🔊 Volume set to **${volume}%**`);
    }
};
