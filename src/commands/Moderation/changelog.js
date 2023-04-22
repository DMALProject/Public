const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, Permissions } = require('discord.js');

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Crea un nuovo changelog con questo comando!"),

    async execute(interaction) {
        const changelog = new ModalBuilder()
        .setTitle("Nuovo changelog")
        .setCustomId('changelog')

        const idStanza = new TextInputBuilder()
        .setCustomId('idStanza')
        .setRequired(true)
        .setLabel('Inserisci l\'id della stanza!')
        .setStyle(TextInputStyle.Short);

        const messaggio = new TextInputBuilder()
        .setCustomId('messaggio')
        .setRequired(true)
        .setLabel('Inserisci la descrizione del changelog')
        .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(idStanza)
        const secondActionRow = new ActionRowBuilder().addComponents(messaggio)

        changelog.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(changelog)
    }

}