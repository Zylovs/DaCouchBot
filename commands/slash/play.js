import { SlashCommandBuilder } from "discord.js";
import { QueryType } from "discord-player";

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
        const query = interaction.options.getString("query");
        const vc = interaction.member.voice.channel;

        if (!vc) return interaction.reply("❌ You must be in a voice channel!");

        const player = interaction.client.player;

        // v6: create queue
        const queue = player.nodes.create(interaction.guild, {
            metadata: interaction.channel
        });

        try {
            if (!queue.connection) await queue.connect(vc);
        } catch {
            queue.delete();
            return interaction.reply("❌ Couldn't join your voice channel.");
        }

        const result = await player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        });

        if (!result.hasTracks())
            return interaction.reply("❌ No tracks found.");

        queue.addTrack(result.tracks[0]);
        if (!queue.node.isPlaying()) await queue.node.play();

        interaction.reply(`🎶 Added **${result.tracks[0].title}** to the queue.`);
    }
};
