import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { loadCommands } from './handlers/commandHandler.js';
import { registerEventHandlers } from './handlers/events.js';
import { createPlayer } from './music/player.js';

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
// ASYNC INIT FUNCTION
// ------------------------------
async function initBot() {
  try {
    // Initialize music player and await extractors loading
    await createPlayer(client);

    // Load commands
    await loadCommands(client);

    // Register events
    registerEventHandlers(client);

    // Login
    await client.login(process.env.TOKEN);

    console.log('✅ Bot fully online.');
  } catch (err) {
    console.error('❌ Bot initialization failed:', err);
  }
}

// Start the bot
initBot();
