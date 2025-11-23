import { readdirSync, existsSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function loadCommands(client) {
    console.log("Loading commands...");

    client.commands = new Map();        // Slash commands
    client.prefixCommands = new Map();  // Prefix commands

    // -----------------------------
    // LOAD SLASH COMMANDS
    // -----------------------------
    const slashFolder = path.join(process.cwd(), "commands", "slash");

    if (existsSync(slashFolder)) {
        const slashFiles = readdirSync(slashFolder).filter(f => f.endsWith(".js"));

        for (const file of slashFiles) {
            try {
                const filePath = path.join(slashFolder, file);
                const command = await import(pathToFileURL(filePath));

                if (!command.default?.data?.name) {
                    console.warn(`⚠️ Slash command "${file}" missing data.name`);
                    continue;
                }

                client.commands.set(command.default.data.name, command.default);
            } catch (err) {
                console.error(`❌ Error loading slash command ${file}:`, err);
            }
        }
    } else {
        console.warn("⚠️ Slash commands folder not found.");
    }

    // -----------------------------
    // LOAD PREFIX COMMANDS
    // -----------------------------
    const prefixFolder = path.join(process.cwd(), "commands", "prefix");

    if (existsSync(prefixFolder)) {
        const prefixFiles = readdirSync(prefixFolder).filter(f => f.endsWith(".js"));

        for (const file of prefixFiles) {
            try {
                const filePath = path.join(prefixFolder, file);
                const cmd = await import(pathToFileURL(filePath));

                if (!cmd.default?.name) {
                    console.warn(`⚠️ Prefix command "${file}" missing name`);
                    continue;
                }

                client.prefixCommands.set(cmd.default.name, cmd.default);
            } catch (err) {
                console.error(`❌ Error loading prefix command ${file}:`, err);
            }
        }
    } else {
        console.warn("⚠️ Prefix commands folder not found.");
    }

    console.log("✅ Commands loaded.");
}
