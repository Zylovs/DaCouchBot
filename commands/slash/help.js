import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all available bot commands");

export async function execute(interaction, client) {
    const commandList = client.commands.map(
        cmd => `**/${cmd.name}** — ${cmd.description}`
    ).join("\n");

    await interaction.reply({
        content: `📘 **Help Menu**\n\n${commandList}`,
        ephemeral: true
    });
}
