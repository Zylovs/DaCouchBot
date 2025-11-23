import {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName("menu")
        .setDescription("Sends a select menu example"),

    async execute(interaction) {

        const menu = new StringSelectMenuBuilder()
            .setCustomId("test_menu")
            .setPlaceholder("Choose an option...")
            .addOptions([
                { label: "Option 1", value: "one" },
                { label: "Option 2", value: "two" },
                { label: "Option 3", value: "three" }
            ]);

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            content: "Choose an option:",
            components: [row]
        });
    }
};
