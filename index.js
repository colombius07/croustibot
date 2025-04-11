// index.js
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
config();

// Initialiser le client Discord avec les intents nécessaires
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Charger les fonctions de commandes depuis commandes.js
const commandes = require('./commandes.js').default;

// Charger les commandes depuis le fichier commandes.json
const commandesData = JSON.parse(fs.readFileSync(path.resolve('commandes.JSON'), 'utf-8'));

// Créer une Map pour associer les noms de commandes à leurs fonctions
client.commands = new Map();

// Associer chaque commande à sa fonction
commandesData.forEach(({ name }) => {
  if (commandes[name]) {
    client.commands.set(name, commandes[name]);
  }
});

// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

// Gestion des messages entrants
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const prefix = '!';

  // Vérifier si le message commence par le préfixe
  if (message.content.toLowerCase().startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Vérifier si la commande existe
    if (client.commands.has(commandName)) {
      try {
        // Exécuter la fonction de la commande
        client.commands.get(commandName)(message, args);
      } catch (error) {
        console.error(error);
        message.reply('❌ Une erreur est survenue lors de l\'exécution de la commande.');
      }
    }
  }

  // Commande !help
  if (message.content.toLowerCase() === `${prefix}help`) {
    const helpMessage = ['**Liste des commandes disponibles :**'];
    commandesData.forEach(({ name, description }) => {
      helpMessage.push(`**${prefix}${name}**: ${description}`);
    });
    message.channel.send(helpMessage.join('\n'));
}});

// Connexion du bot avec le token
client.login(process.env.DISCORD_TOKEN);