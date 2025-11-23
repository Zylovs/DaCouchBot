import { QueryType } from "discord-player";

export default {
    name: "play",
    description: "Play a song or playlist",
    async execute(message, args) {
        const query = args.join(" ");
        if (!query) return message.reply("❌ Please provide a song name or URL.");

        const channel = message.member.voice.channel;
        if (!channel) return message.reply("❌ You must be in a voice channel.");

        const player = message.client.player;

        // Create a queue for this guild
        const queue = player.nodes.create(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(channel);
        } catch {
            queue.delete();
            return message.reply("❌ Couldn't join the voice channel.");
        }

        // Detect search type
        let searchType;
        if (query.includes("list=")) searchType = QueryType.YOUTUBE_PLAYLIST;
        else if (query.includes("youtube.com") || query.includes("youtu.be")) searchType = QueryType.YOUTUBE_VIDEO;
        else searchType = QueryType.AUTO;

        const result = await player.search(query, {
            requestedBy: message.author,
            searchEngine: searchType
        });

        if (!result.hasTracks()) return message.reply("❌ No results found.");

        if (result.playlist) {
            queue.addTracks(result.tracks);
            message.reply(`🎶 Added playlist **${result.playlist.title}** with ${result.tracks.length} tracks to the queue!`);
        } else {
            queue.addTrack(result.tracks[0]);
            message.reply(`🎶 Added **${result.tracks[0].title}** to the queue!`);
        }

        if (!queue.node.isPlaying()) await queue.node.play();
    }
};
