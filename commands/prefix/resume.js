// commands/prefix/resume.js
export default {
    name: "resume",
    description: "Resume the paused song",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue) return message.reply("❌ Nothing is playing.");

        queue.node.setPaused(false);
        message.reply("▶ Resumed the player.");
    }
};
