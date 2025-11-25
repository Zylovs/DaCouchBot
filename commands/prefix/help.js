export default {
    name: "help",
    description: "Shows all available commands",
    async execute(message, args, client) {

        const commandList = client.commands.map(cmd => `**${cmd.name}** - ${cmd.description}`).join("\n");

        const response = `
📘 **Help Menu**
Here are my available commands:

${commandList}

Prefix: **${client.prefix}**
`;

        message.channel.send(response);
    }
};
