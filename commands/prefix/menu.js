import { StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";

export default {
    name: "menu",
    description: "Send a select menu",

    async execute(message) {

        const menu = new StringSelectMenuBuilder()
            .setCustomId("test_menu")
            .setPlaceholder("Pick something!")
            .addOptions([
                { label: "A", value: "a" },
                { label: "B", value: "b" }
            ]);

        const row = new ActionRowBuilder().addComponents(menu);

        message.reply({
            content: "Which one?",
            components: [row]
        });
    }
};
