// events.js
export function registerEventHandlers(client) {
    
    // ===========================
    // Slash Commands
    // ===========================
    client.on('interactionCreate', async interaction => {

        // Slash Commands
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (err) {
                console.error(err);
                interaction.reply({ 
                    content: '❌ Error executing slash command.', 
                    ephemeral: true 
                });
            }
        }

        // Buttons
        else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return;

            try {
                await btn.execute(interaction);
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content: '❌ Error executing button.',
                    ephemeral: true
                });
            }
        }

        // Select Menus
        else if (interaction.isStringSelectMenu()) {
            const menu = client.menus.get(interaction.customId);
            if (!menu) return;

            try {
                await menu.execute(interaction);
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content: '❌ Error executing menu.',
                    ephemeral: true
                });
            }
        }

    });

    
    // ===========================
    // Prefix Commands
    // ===========================
    client.on('messageCreate', async message => {

        if (message.author.bot) return;

        const prefix = client.prefix;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/\s+/);

        const cmdName = args.shift().toLowerCase();
        const command = client.prefixCommands.get(cmdName);

        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (err) {
            console.error(err);
            message.reply('❌ Error executing command.');
        }
    });


    // ===========================
    // Bot Ready
    // ===========================
    client.on('ready', () => {
        console.log(`✅ Logged in as ${client.user.tag}`);
    });
}
