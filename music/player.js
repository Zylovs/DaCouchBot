// music/player.js
import { Player } from "discord-player";

export function createPlayer(client) {
    const player = new Player(client, {
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    });

    // --- Player Events ---
    player.on("trackStart", (queue, track) => {
        queue.metadata?.send(`🎶 Now playing: **${track.title}**`);
    });

    player.on("trackAdd", (queue, track) => {
        queue.metadata?.send(`➕ Added to queue: **${track.title}**`);
    });

    player.on("queueEnd", queue => {
        queue.metadata?.send("📭 Queue finished.");
    });

    player.on("error", (error, queue) => {
        console.error("Player Error:", error);
        queue?.metadata?.send("❌ A playback error occurred.");
    });

    client.player = player;
}
