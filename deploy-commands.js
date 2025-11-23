import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';

const commands = [];
const cmdPath = './commands/slash';
const files = fs.readdirSync(cmdPath).filter(f => f.endsWith('.js'));

for (const file of files) {
  const { default: cmd } = await import(`./commands/slash/${file}`);
  commands.push({ name: cmd.name, description: cmd.description });
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
console.log("Slash commands deployed.");