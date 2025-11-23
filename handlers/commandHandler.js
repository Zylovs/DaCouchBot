import { readdirSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function loadCommands(client) {

    // Load SLASH commands
    const slashFolder = './commands/slash';
    const slashFiles = readdirSync(slashFolder).filter(f => f.endsWith('.js'));

    for (const file of slashFiles) {
        const filePath = path.resolve(`${slashFolder}/${file}`);
        const command = await import(pathToFileURL(filePath));
        client.commands.set(command.default.data.name, command.default);
    }

    // Load PREFIX commands
    const prefixFolder = './commands/prefix';
    const prefixFiles = readdirSync(prefixFolder).filter(f => f.endsWith('.js'));

    client.prefixCommands = new Map();

    for (const file of prefixFiles) {
        const filePath = path.resolve(`${prefixFolder}/${file}`);
        const cmd = await import(pathToFileURL(filePath));
        client.prefixCommands.set(cmd.default.name, cmd.default);
    }

    console.log("Commands loaded.");
}
