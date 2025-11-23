// commands/prefix/skip.js
export default {
    name: "skip",
    description: "Skip the current song",

    async execute(message) {
        const queue = message.client.player.getQueue(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply("❌ Nothing is playing.");

        queue.node.skip();

        message.reply("⏭ Skipped the current song.");
    }
};
