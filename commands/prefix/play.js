import { QueryType } from "discord-player";

export default {
    name: "play",
    description: "Play a song",
    async execute(message, args) {
        const query = args.join(" ");
        if (!query) return message.reply("❌ Please provide a song name or URL.");

        const channel = message.member.voice.channel;
        if (!channel) return message.reply("❌ You must be in a voice channel.");

        const player = message.client.player;

        // ✅ Create a queue using the NEW API
        const queue = player.nodes.create(message.guild.id, {
            metadata: message.channel
        });

        try {
            // Connect to voice if not already connected
            if (!queue.connection) {
                await queue.connect(channel);
            }
        } catch {
            queue.delete();
            return message.reply("❌ Couldn't join the voice channel.");
        }

        // Search for the track
        const searchResult = await player.search(query, {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });

        if (!searchResult.hasTracks())
            return message.reply("❌ No results found.");

        // Add the first track to queue
        await queue.addTrack(searchResult.tracks[0]);

        // Play if nothing is currently playing
        if (!queue.node.isPlaying()) {
            await queue.node.play();
        }

        message.reply(`🎶 Added **${searchResult.tracks[0].title}** to the queue!`);
    }
};
