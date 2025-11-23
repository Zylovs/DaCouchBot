// events.js

export function registerEventHandlers(client) {
    // SAFE-INIT collections to prevent crashes
    client.buttons = client.buttons || new Map();
    client.menus = client.menus || new Map();

    // =====================================
    // Slash Commands
    // =====================================
    client.on("interactionCreate", async interaction => {

        // Slash Commands
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                console.warn(`⚠️ Slash command not found: ${interaction.commandName}`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (err) {
                console.error("❌ Slash command error:", err);

                if (!interaction.replied) {
                    await interaction.reply({
                        content: "❌ Error executing slash command.",
                        ephemeral: true
                    }).catch(() => {});
                }
            }
        }

        // Buttons
        else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);

            if (!button) {
                console.warn(`⚠️ Button handler not found: ${interaction.customId}`);
                return;
            }

            try {
                await button.execute(interaction);
            } catch (err) {
                console.error("❌ Button execution error:", err);
            }
        }

        // Select Menus
        else if (interaction.isStringSelectMenu()) {
            const menu = client.menus.get(interaction.customId);

            if (!menu) {
                console.warn(`⚠️ Menu handler not found: ${interaction.customId}`);
                return;
            }

            try {
                await menu.execute(interaction);
            } catch (err) {
                console.error("❌ Menu execution error:", err);
            }
        }
    });

    // =====================================
    // Prefix Commands
    // =====================================
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const prefix = client.prefix || "!";

        if (!message.content.startsWith(prefix)) return;

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/\s+/);

        const cmdName = args.shift().toLowerCase();
        const command = client.prefixCommands.get(cmdName);

        if (!command) {
            console.warn(`⚠️ Prefix command not found: ${cmdName}`);
            return;
        }

        try {
            await command.execute(message, args);
        } catch (err) {
            console.error("❌ Prefix command error:", err);
            message.reply("❌ Error executing command.");
        }
    });

    // =====================================
    // Bot Ready
    // =====================================
    client.on("ready", () => {
        console.log(`✅ Logged in as ${client.user.tag}`);
        console.log("🔥 Bot fully online and handlers registered.");
    });
}
