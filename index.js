const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');
const { log } = require('./logger');

// === ENVIRONNEMENT ===
log('🔧 Chargement des variables d\'environnement...');
config();

log('✅ process.env.DISCORD_TOKEN:', process.env.DISCORD_TOKEN ? '[OK]' : '[MISSING ❌]');

// === CLIENT DISCORD ===
log('🤖 Initialisation du client Discord...');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
log('✅ Client Discord initialisé.');

// === CHARGEMENT DES COMMANDES ===
log('📦 Chargement des fonctions de commande...');
const commandes = require('./commandes.js');
log('📦 Fonctions importées depuis commandes.js :', Object.keys(commandes));

// === CHARGEMENT DU JSON ===
log('📄 Lecture du fichier commandes.json...');
const commandesFilePath = path.resolve('commandes.json');
log('🗂️ Chemin absolu du JSON:', commandesFilePath);

const commandesData = JSON.parse(fs.readFileSync(commandesFilePath, 'utf-8'));
log('✅ Données lues dans commandes.json:', commandesData);

// === MAPPING COMMANDES ===
client.commands = new Map();
log('🔁 Association des commandes:');

commandesData.forEach(({ name }) => {
  log(`➡️ Vérification de la commande: "${name}"`);
  if (commandes[name]) {
    client.commands.set(name, commandes[name]);
    log(`✅ "${name}" liée à sa fonction.`);
  } else {
    console.warn(`⚠️ Fonction "${name}" introuvable dans commandes.js`);
  }
});

log('✅ Toutes les commandes sont mappées.');

// === EVENT : BOT PRÊT ===
client.once('ready', () => {
  log(`🟢 Bot connecté en tant que ${client.user.tag}`);
});

// === EVENT : MESSAGE CREATE ===
client.on('messageCreate', (message) => {
  log('📩 Nouveau message reçu !');
  log('   🧑 Auteur :', message.author.username);
  log('   🧾 Contenu :', message.content);
  log('   🔍 Est-ce un bot ?', message.author.bot);

  if (message.author.bot) {
    log('⏩ Ignoré (message d\'un bot)');
    return;
  }

  const prefix = '!';
  if (message.content.toLowerCase().startsWith(prefix)) {
    log('📌 Message commence par le préfixe !');

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    log(`📥 Commande détectée: "${commandName}"`);
    log('📦 Arguments:', args);

    if (client.commands.has(commandName)) {
      log(`🚀 Exécution de la commande "${commandName}"`);
      try {
        client.commands.get(commandName)(message, args);
        log(`✅ Commande "${commandName}" exécutée sans erreur.`);
      } catch (error) {
        console.error(`❌ Erreur pendant l'exécution de "${commandName}":`, error);
        message.reply('❌ Une erreur est survenue lors de l\'exécution de la commande.');
      }
    } else {
      console.warn(`❓ Commande "${commandName}" non trouvée dans la map.`);
    }
  }

  // === COMMANDE HELP ===
  if (message.content.toLowerCase() === `${prefix}help`) {
    log('📚 Commande !help détectée, génération de la liste...');
    const helpMessage = ['**Liste des commandes disponibles :**'];
    commandesData.forEach(({ name, description }) => {
      helpMessage.push(`**${prefix}${name}**: ${description}`);
    });
    message.channel.send(helpMessage.join('\n'));
    log('✅ Message d\'aide envoyé.');
  }
});

// === LOGIN DU BOT ===
log('🔑 Connexion du bot...');
client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    log('🔓 Connexion réussie !');
  })
  .catch((err) => {
    console.error('❌ Échec de la connexion au bot :', err);
  });
