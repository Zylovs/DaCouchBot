import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { loadCommands } from './handlers/commandHandler.js';
import { registerEventHandlers } from './handlers/events.js';
import { createPlayer } from './music/player.js'; // <-- ADD THIS

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

// ------------------------------
// INITIALIZE MUSIC PLAYER
// ------------------------------
createPlayer(client); // <-- ADD THIS (prevents "player is undefined")

// ------------------------------
// LOAD COMMANDS + EVENTS
// ------------------------------
await loadCommands(client);
registerEventHandlers(client);

// ------------------------------
// LOGIN
// ------------------------------
client.login(process.env.TOKEN);
