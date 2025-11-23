import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("Sends a button example"),

    async execute(interaction) {
        const button = new ButtonBuilder()
            .setCustomId("example_button")
            .setLabel("Click Me!")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({
            content: "Here is a button:",
            components: [row]
        });
    }
};
