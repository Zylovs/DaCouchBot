import { EmbedBuilder } from "discord.js";

export default {
    name: "embed",
    description: "Send an embed example",

    async execute(message) {
        const embed = new EmbedBuilder()
            .setTitle("Prefix Embed Example")
            .setDescription("This embed was sent using `!embed`")
            .setColor(0x3498db);

        message.reply({ embeds: [embed] });
    }
};
