import { SlashCommandBuilder } from "discord.js";
import { hasMusicPermissions } from "../../music/musicRoles.js";

export default {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song from YouTube")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Song name or URL")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.voice.channel)
            return interaction.reply("❌ You must be in a voice channel!");

        if (!hasMusicPermissions(interaction.member))
            return interaction.reply("❌ You need the DJ role or admin.");

        const query = interaction.options.getString("query");

        const queue = interaction.client.player.nodes.create(interaction.guild, {
            metadata: interaction.channel
        });

        try {
            if (!queue.node.isPlaying()) await queue.connect(interaction.member.voice.channel);

            const result = await interaction.client.player.search(query, {
                requestedBy: interaction.user
            });

            if (!result.tracks.length) return interaction.reply("❌ No results found.");

            queue.addTrack(result.tracks[0]);
            if (!queue.node.isPlaying()) queue.node.play();

            interaction.reply(`🎵 Added **${result.tracks[0].title}** to queue.`);
        } catch (err) {
            console.error(err);
            interaction.reply("❌ Error playing track.");
        }
    }
};
