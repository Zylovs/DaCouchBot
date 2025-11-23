// music/player.js
import { Player } from "discord-player";

export async function createPlayer(client) {
    // Create a new player
    const player = new Player(client);

    // Load default extractors (YouTube, Spotify, etc.)
    await player.extractors.loadDefault();

    // --- Player Events ---
    player.events.on("playerStart", (queue, track) => {
        try {
            queue.metadata?.send(`🎶 Now playing: **${track.title}**`);
        } catch {}
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        try {
            queue.metadata?.send(`➕ Added to queue: **${track.title}**`);
        } catch {}
    });

    player.events.on("playerSkip", (queue, track) => {
        try {
            queue.metadata?.send(`⏭ Skipped: **${track.title}**`);
        } catch {}
    });

    player.events.on("queueEnd", (queue) => {
        try {
            queue.metadata?.send("📭 Queue finished.");
        } catch {}
    });

    player.events.on("error", (queue, error) => {
        console.error("Player Error:", error);
        try {
            queue.metadata?.send("❌ A playback error occurred.");
        } catch {}
    });

    // Attach the player to the client
    client.player = player;
}
