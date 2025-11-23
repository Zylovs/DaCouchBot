export default {
    name: "ping",
    description: "Replies with pong!",
    
    async execute(message, args) {
        message.reply("🏓 Pong! (Prefix Command)");
    }
};