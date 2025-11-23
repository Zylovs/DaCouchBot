// music/player.js
import { Player } from "discord-player";
import pkg from "@discord-player/extractor"; // default import for CommonJS
const { YouTubeExtractor } = pkg;           // destructure what you need

export function createPlayer(client) {
    const player = new Player(client);

    // Load YouTube extractor
    player.extractors.load(YouTubeExtractor);

    // Player events
    player.events.on("playerStart", (queue, track) => {
        queue.metadata?.send(`🎶 Now playing: **${track.title}**`);
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        queue.metadata?.send(`➕ Added to queue: **${track.title}**`);
    });

    player.events.on("playerSkip", (queue, track) => {
        queue.metadata?.send(`⏭ Skipped: **${track.title}**`);
    });

    player.events.on("queueEnd", queue => {
        queue.metadata?.send("📭 Queue finished.");
    });

    player.events.on("error", (queue, error) => {
        console.error("Player Error:", error);
        queue.metadata?.send("❌ A playback error occurred.");
    });

    client.player = player;
}
