import { readdirSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function loadCommands(client) {

    client.commands = new Map();        // Holds ALL commands (prefix + slash)
    client.prefixCommands = new Map();  // Prefix only
    client.slashCommands = new Map();   // Slash only

    // -----------------------------
    // LOAD SLASH COMMANDS
    // -----------------------------
    const slashFolder = "./commands/slash";
    const slashFiles = readdirSync(slashFolder).filter(f => f.endsWith(".js"));

    for (const file of slashFiles) {
        const filePath = path.resolve(`${slashFolder}/${file}`);
        const commandModule = await import(pathToFileURL(filePath));

        const command = commandModule.default || commandModule;

        if (!command.data || !command.data.name) {
            console.warn(`⚠ Slash command missing data.name in ${file}`);
            continue;
        }

        client.slashCommands.set(command.data.name, command);
        client.commands.set(command.data.name, command); // add to unified list
    }

    // -----------------------------
    // LOAD PREFIX COMMANDS
    // -----------------------------
    const prefixFolder = "./commands/prefix";
    const prefixFiles = readdirSync(prefixFolder).filter(f => f.endsWith(".js"));

    for (const file of prefixFiles) {
        const filePath = path.resolve(`${prefixFolder}/${file}`);
        const commandModule = await import(pathToFileURL(filePath));

        const command = commandModule.default || commandModule;

        if (!command.name) {
            console.warn(`⚠ Prefix command missing name in ${file}`);
            continue;
        }

        client.prefixCommands.set(command.name, command);
        client.commands.set(command.name, command); // add to unified list
    }

    console.log("✔ All commands successfully loaded.");
}
