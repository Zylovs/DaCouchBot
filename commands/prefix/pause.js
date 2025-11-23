// commands/prefix/pause.js
export default {
    name: "pause",
    description: "Pause the current song",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply("❌ Nothing is playing.");

        queue.node.setPaused(true);
        message.reply("⏸ Paused the player.");
    }
};
