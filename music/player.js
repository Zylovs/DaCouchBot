// music/player.js
import { Player } from "discord-player";
import "dotenv/config";

export function createPlayer(client) {
    const player = new Player(client);

    // --- Player Events ---

    // When a track starts
    player.events.on("playerStart", (queue, track) => {
        if (!queue || !queue.metadata) return;
        queue.metadata.send(`🎶 Now playing: **${track.title}**`);
    });

    // When a track is added
    player.events.on("audioTrackAdd", (queue, track) => {
        if (!queue || !queue.metadata) return;
        queue.metadata.send(`➕ Added to queue: **${track.title}**`);
    });

    // When skipping
    player.events.on("playerSkip", (queue, track) => {
        if (!queue || !queue.metadata) return;
        queue.metadata.send(`⏭ Skipped: **${track.title}**`);
    });

    // Queue finished
    player.events.on("queueEnd", queue => {
        if (!queue || !queue.metadata) return;
        queue.metadata.send("📭 Queue finished.");
    });

    player.events.on("error", (queue, error) => {
        console.error("Player Error:", error);
        if (queue?.metadata) {
            queue.metadata.send("❌ A playback error occurred.
