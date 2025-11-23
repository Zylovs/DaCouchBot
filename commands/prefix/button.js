import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
    name: "button",
    description: "Send a sample button",

    async execute(message) {
        const button = new ButtonBuilder()
            .setCustomId("example_button")
            .setLabel("Click Me!")
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        message.reply({
            content: "Here is a button:",
            components: [row]
        });
    }
};
