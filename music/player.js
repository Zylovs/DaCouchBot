// music/player.js
import { Player } from "discord-player";
import extractorPkg from "@discord-player/extractor";

const { YouTubeExtractor, SpotifyExtractor, SoundCloudExtractor } = extractorPkg;

export async function createPlayer(client) {
    const player = new Player(client);

    // Load extractors
    await player.extractors.load(YouTubeExtractor);
    await player.extractors.load(SpotifyExtractor);
    await player.extractors.load(SoundCloudExtractor);

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

    player.events.on("queueEnd", queue => {
        queue.metadata?.send("📭 Queue finished.");
    });

    player.events.on("error", (queue, error) => {
        console.error("Player Error:", error);
        queue.metadata?.send("❌ A playback error occurred.");
    });

    client.player = player;
}
