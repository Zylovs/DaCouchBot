// events.js

export function registerEventHandlers(client) {

    // SAFE INIT — prevents crashes if missing
    client.buttons = client.buttons || new Map();
    client.menus = client.menus || new Map();

    // ==================================================
    // INTERACTIONS (Slash, Buttons, Menus)
    // ==================================================
    client.on("interactionCreate", async interaction => {

        // -----------------------
        // SLASH COMMANDS
        // -----------------------
        if (interaction.isChatInputCommand()) {

            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {
                console.warn(`⚠️ Slash command not found: ${interaction.commandName}`);
                return interaction.reply({
                    content: "That command no longer exists.",
                    ephemeral: true
                }).catch(() => {});
            }

            try {
                await command.execute(interaction);
            } catch (err) {
                console.error(`❌ Slash command error (${interaction.commandName}):`, err);

                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: "❌ An error occurred while running this command.",
                        ephemeral: true
                    }).catch(() => {});
                }
            }
        }

        // -----------------------
        // BUTTON HANDLERS
        // -----------------------
        else if (interaction.isButton()) {

            const button = client.buttons.get(interaction.customId);

            if (!button) {
                console.warn(`⚠️ Missing button handler: ${interaction.customId}`);
                return;
            }

            try {
                await button.execute(interaction);
            } catch (err) {
                console.error(`❌ Button error (${interaction.customId}):`, err);
            }
        }

        // -----------------------
        // SELECT MENUS
        // -----------------------
        else if (interaction.isStringSelectMenu()) {

            const menu = client.menus.get(interaction.customId);

            if (!menu) {
                console.warn(`⚠️ Missing menu handler: ${interaction.customId}`);
                return;
            }

            try {
                await menu.execute(interaction);
            } catch (err) {
                console.error(`❌ Menu error (${interaction.customId}):`, err);
            }
        }

    });

    // ==================================================
    // PREFIX COMMANDS
    // ==================================================
    client.on("messageCreate", async message => {

        if (message.author.bot) return;

        const prefix = client.prefix || "!";

        // Not a prefix command
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/\s+/);
        const cmdName = args.shift().toLowerCase();

        const command = client.prefixCommands.get(cmdName);

        if (!command) {
            console.warn(`⚠️ Prefix command not found: ${cmdName}`);
            return;
        }

        try {
            await command.execute(message, args);
        } catch (err) {
            console.error(`❌ Prefix command error (${cmdName}):`, err);
            message.reply("❌ Something went wrong running that command.")
                .catch(() => {});
        }
    });

    // ==================================================
    // BOT READY
    // Discord.js v15 rename: “ready” → “clientReady”
    // ==================================================
    client.once("clientReady", () => {
        console.log(`✅ Logged in as ${client.user.tag}`);
        console.log("🔥 Bot fully online and event handlers registered.");
    });
}
