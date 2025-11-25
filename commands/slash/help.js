import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all available bot commands"),

    async execute(interaction) {

        const client = interaction.client;

        const commandList = [...client.commands.values()]
            .map(cmd => `**/${cmd.data.name}** — ${cmd.data.description}`)
            .join("\n");

        await interaction.reply({
            content: `📘 **Slash Command Help Menu**\n\n${commandList}`,
            ephemeral: true
        });
    }
};
