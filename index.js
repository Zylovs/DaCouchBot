import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { loadCommands } from './handlers/commandHandler.js';
import { registerEventHandlers } from './handlers/events.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();
client.prefix = process.env.PREFIX || "!";

await loadCommands(client);
registerEventHandlers(client);

client.login(process.env.TOKEN);