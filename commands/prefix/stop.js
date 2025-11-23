// commands/prefix/stop.js
export default {
    name: "stop",
    description: "Stop music and clear the queue",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply("❌ Nothing is playing.");

        queue.delete();
        message.reply("🛑 Stopped the player and cleared the queue.");
    }
};
