export default {
    name: "skip",
    description: "Skip the current song",
    async execute(message) {
        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying())
            return message.reply("❌ Nothing is playing.");

        queue.node.skip();
        message.reply("⏭ Skipped the current song.");
    }
};
