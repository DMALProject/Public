const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const fs = require('fs');
const { isDataView } = require('util/types');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 


client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isModalSubmit()) return;

    const idStanza = interaction.fields.getTextInputValue('idStanza');
    const messaggio = interaction.fields.getTextInputValue('messaggio');

    if (interaction.customId === 'changelog'){
        const targetChannel = interaction.guild.channels.cache.get(idStanza);
        if (!targetChannel) {
            await interaction.reply({ content: `Canale non trovato!`, ephemeral: true})
        }
        await interaction.reply({ content: `Il tuo changelog è stato inviato nella stanza <#${idStanza}>`, ephemeral: true})
    }

    const targetChannel = interaction.guild.channels.cache.get(idStanza);

    const date = new Date();
    const title = `CHANGE-LOG FIVEM - ${date.toLocaleDateString('it-IT')}`;
    const embed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(title)
    .setAuthor({ name: `Wastaland Official Bot`, iconURL: `https://media.discordapp.net/attachments/1023289857830817852/1071158293386502295/96x96.png`})
    .setDescription(messaggio)
    .setThumbnail(`https://media.discordapp.net/attachments/1023289857830817852/1071158293386502295/96x96.png`)
    .setFooter({ text: "Wasteland Project", iconURL: `https://media.discordapp.net/attachments/1023289857830817852/1071158293386502295/96x96.png`});

    await targetChannel.send({ embeds: [embed] });

})