// music/player.js
import { Player } from "discord-player";
import pkg from "@discord-player/extractor"; // CommonJS import for v6
const { YouTubeExtractor } = pkg;            // extract the YouTube extractor

export function createPlayer(client) {
    // Create a new player
    const player = new Player(client);

    // --- Load extractors (required in v6) ---
    player.extractors.load(YouTubeExtractor);

    // --- Player Events ---
    player.events.on("playerStart", (queue, track) => {
        queue.metadata?.send(`🎶 Now playing: **${track.title}**`);
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        queue.metadata?.send(`➕ Added to queue: **${track.title}**`);
    });

    player.events.on("playerSkip", (queue, track) => {
        queue.metadata?.send(`⏭ Skipped: **${track.title}**`);
    });

    player.events.on("queueEnd", (queue) => {
        queue.metadata?.send("📭 Queue finished.");
    });

    player.events.on("error", (queue, error) => {
        console.error("Player Error:", error);
        queue.metadata?.send("❌ A playback error occurred.");
    });

    // Attach the player to the client
    client.player = player;
}
