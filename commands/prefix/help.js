export default {
    name: "help",
    description: "Shows all available prefix commands",

    async execute(message, args) {

        const client = message.client; // Get client from message

        const prefix = client.prefix || "!";

        // List prefix commands
        const commandList = [...client.prefixCommands.values()]
            .map(cmd => `**${prefix}${cmd.name}** - ${cmd.description || "No description"}`)
            .join("\n");

        const response = `
📘 **Help Menu — Prefix Commands**
Here are my available commands:

${commandList}

Prefix: **${prefix}**
`;

        message.channel.send(response);
    }
};
