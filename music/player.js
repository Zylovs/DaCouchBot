// music/player.js
import { Player } from "discord-player";
import "dotenv/config";

export function createPlayer(client) {
    const player = new Player(client, {
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    });

    // Event listeners
    player.events.on("playerStart", (queue, track) => {
        queue.metadata.send(`🎶 Now playing: **${track.title}**`);
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        queue.metadata.send(`➕ Added to queue: **${track.title}**`);
    });

    player.events.on("playerSkip", (queue, track) => {
        queue.metadata.send(`⏭ Skipped: **${track.title}**`);
    });

    player.events.on("queueEnd", queue => {
        queue.metadata.send("📭 Queue finished.");
    });

    client.player = player;
}
