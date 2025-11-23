// commands/prefix/play.js
import { hasMusicPermissions } from "../../music/musicRoles.js";

export default {
    name: "play",
    description: "Play a song from YouTube",
    async execute(message, args) {
        if (!message.member.voice.channel)
            return message.reply("❌ You must be in a voice channel!");

        if (!hasMusicPermissions(message.member))
            return message.reply("❌ You need the DJ role or admin.");

        const query = args.join(" ");
        const queue = message.client.player.nodes.create(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.node.isPlaying()) await queue.connect(message.member.voice.channel);

            const result = await message.client.player.search(query, {
                requestedBy: message.author
            });

            if (!result.tracks.length) return message.reply("❌ No results found.");

            queue.addTrack(result.tracks[0]);
            if (!queue.node.isPlaying()) queue.node.play();

            message.reply(`🎵 Added **${result.tracks[0].title}** to queue.`);
        } catch (err) {
            console.error(err);
            message.reply("❌ Error playing track.");
        }
    }
};
