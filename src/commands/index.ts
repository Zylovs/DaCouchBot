import ping from "./ping";
import type {
  APIInteraction,
  InteractionResponseType,
  APIApplicationCommandOptionBase,
  APIUserApplicationCommandGuildInteraction,
  ApplicationCommandOptionType
} from "discord-api-types";

import type { Command } from "./types"; // your Command interface

const commands: Command[] = [ping];

export default {
  async fetch(request: Request): Promise<Response> {
    const body = (await request.json()) as APIInteraction;

    if (body.type === 1) {
      return new Response(
        JSON.stringify({ type: InteractionResponseType.Pong }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (body.type === 2) {
      const command = commands.find(cmd => cmd.data.name === body.data.name);
      if (!command) return new Response("Command not found", { status: 404 });

      const result = await command.execute(body as APIUserApplicationCommandGuildInteraction);

      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: result
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Unsupported interaction", { status: 400 });
  }
};
