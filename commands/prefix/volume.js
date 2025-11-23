export default {
    name: "volume",
    description: "Change the player volume (0-100)",
    async execute(message, args) {
        const volume = parseInt(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 100)
            return message.reply("❌ Please provide a number between 0-100.");

        const queue = message.client.player.nodes.get(message.guild.id);
        if (!queue) return message.reply("❌ Nothing is playing.");

        queue.node.setVolume(volume);
        message.reply(`🔊 Volume set to **${volume}%**`);
    }
};
