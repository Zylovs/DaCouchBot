import "dotenv/config";
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const commands = [];
const slashFolder = "./commands/slash";
const files = fs.readdirSync(slashFolder).filter(f => f.endsWith(".js"));

for (const file of files) {
    const filePath = path.resolve(`${slashFolder}/${file}`);
    const cmdModule = await import(pathToFileURL(filePath));
    const command = cmdModule.default || cmdModule;

    if (!command.data) {
        console.warn(`❌ Missing .data in slash command: ${file}`);
        continue;
    }

    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
);

console.log("✔ Slash commands successfully deployed.");
