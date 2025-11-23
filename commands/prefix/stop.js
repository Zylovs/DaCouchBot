// commands/prefix/stop.js
export default {
    name: "stop",
    description: "Stop music and clear the queue",

    async execute(message) {
        const queue = message.client.player.getQueue(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply("❌ Nothing is playing.");

        queue.delete();

        message.reply("🛑 Stopped the player and cleared the queue.");
    }
};
