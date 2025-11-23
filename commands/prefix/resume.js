export default {
    name: "resume",
    description: "Resume the paused song",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue || !queue.currentTrack)
            return message.reply("❌ Nothing is playing.");

        if (!queue.node.isPaused())
            return message.reply("❌ The player is not paused.");

        queue.node.setPaused(false);
        message.reply("▶ Resumed the player.");
    }
};
