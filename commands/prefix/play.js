// commands/prefix/play.js
import { QueryType } from "discord-player";

export default {
    name: "play",
    description: "Play a song",

    async execute(message, args) {
        const query = args.join(" ");
        if (!query) return message.reply("❌ Provide a song name or URL!");

        // User must be in a voice channel
        const vc = message.member.voice.channel;
        if (!vc) return message.reply("❌ You must be in a voice channel!");

        const player = message.client.player;

        // Create queue
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        // Connect to VC
        try {
            if (!queue.connection) await queue.connect(vc);
        } catch (e) {
            console.log(e);
            queue.delete();
            return message.reply("❌ Unable to join voice channel.");
        }

        // Search song
        const result = await player.search(query, {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });

        if (!result.tracks.length)
            return message.reply("❌ No results found.");

        // Add first track
        queue.addTrack(result.tracks[0]);

        // Play if not already playing
        if (!queue.isPlaying()) queue.node.play();

        return message.reply(`🎵 Added **${result.tracks[0].title}** to queue.`);
    }
};
