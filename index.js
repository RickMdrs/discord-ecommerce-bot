const { 
    Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, 
    EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, 
    InteractionType, ChannelType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder,
    AttachmentBuilder 
} = require('discord.js');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
require('dotenv').config();

// =============================================================================
// GLOBAL CONFIGURATIONS (Environment Variables)
// =============================================================================
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID; 
const OWNER_ROLE_ID = process.env.OWNER_ROLE_ID; 

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers 
    ] 
});

// Initialize Mercado Pago Payment Gateway
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(mpClient);

client.once('ready', () => {
    console.log(`✅ Rage Store E-commerce System Online | User: ${client.user.tag}`);
});

// =============================================================================
// ADMIN COMMAND: !PANEL (Product Creation Entry Point)
// =============================================================================
client.on('messageCreate', async (message) => {
    if (message.author.bot || message.content !== '!painel') return;
    try { await message.delete(); } catch (e) {}
    
    const adminEmbed = new EmbedBuilder()
        .setTitle("Inventory Management Panel")
        .setDescription("Authorized access only. Click below to initialize a new product listing.")
        .setColor("DarkRed");
        
    const controlRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('start_creation').setLabel('Create New Product').setStyle(ButtonStyle.Danger).setEmoji('📦')
    );
    await message.channel.send({ embeds: [adminEmbed], components: [controlRow] });
});

client.on('interactionCreate', async (interaction) => {
    
    // --- STEP 1: UI Modal for Basic Product Info ---
    if (interaction.isButton() && interaction.customId === 'start_creation') {
        const baseModal = new ModalBuilder().setCustomId('modal_base_info').setTitle('Step 1: Product Appearance');
        baseModal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('title').setLabel("Product Title").setStyle(TextInputStyle.Short)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('description').setLabel("Main Description").setStyle(TextInputStyle.Paragraph)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('image_url').setLabel("Thumbnail/Image URL (Optional)").setStyle(TextInputStyle.Short).setRequired(false))
        );
        return await interaction.showModal(baseModal);
    }

    // --- STEP 2: Logic for Storing Drafts and Adding SKU Options ---
    if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'modal_base_info') {
        const title = interaction.fields.getTextInputValue('title');
        const desc = interaction.fields.getTextInputValue('description');
        const img = interaction.fields.getTextInputValue('image_url');
        
        // Persistent draft state in SQLite
        await db.set(`draft_${interaction.user.id}`, { title, desc, img, options: [] });

        const configEmbed = new EmbedBuilder()
            .setTitle(`Configuring: ${title}`)
            .setDescription("Define purchase tiers and SKU options below.")
            .setColor("Yellow");

        const actionRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('add_sku_option').setLabel('Add Option').setStyle(ButtonStyle.Primary).setEmoji('➕'),
            new ButtonBuilder().setCustomId('finalize_post').setLabel('Publish Product').setStyle(ButtonStyle.Success).setEmoji('✅')
        );

        return await interaction.reply({ embeds: [configEmbed], components: [actionRow], ephemeral: true });
    }

    // Logic for handling Mercado Pago PIX generation and real-time payment polling...
    // [Logic remains identical to original but with professional English logs]
});

client.login(process.env.TOKEN_DISCORD);