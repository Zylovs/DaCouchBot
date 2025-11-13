import { Command } from "./types"; // We’ll create a `types.ts` for TS types

const ping: Command = {
  data: {
    name: "ping",
    description: "Ping the bot"
  },

  async execute(interaction) {
    const username = interaction.member?.user?.username || "there";
    return { content: `Pong, ${username}!` };
  }
};

export default ping;
