# Bot Discord en Node.js

Ce projet crée un bot Discord utilisant Node.js et la bibliothèque `discord.js`. Le bot est capable de répondre à des commandes spécifiques et d'interagir avec les utilisateurs sur Discord.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 16.6 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)

## Installation

1. **Clonez le repository :**

   ```bash
   git clone https://github.com/colombius07/tonybot.git
   cd nom-du-dossier-du-projet
   ```

2. **Initialisez le projet Node.js :**

- Si ce n'est pas déjà fait, initialisez un projet Node.js pour générer un fichier package.json :
`npm init -y`

3. **Installez les dépendances :**

- Installez discord.js pour interagir avec l'API Discord et dotenv pour gérer les variables d'environnement :
  `npm install discord.js dotenv`

4. **Configurez votre bot :**

- Créez une application sur le [portail développeur Discord](https://discord.com/developers/applications):
   - Allez dans l'onglet "Applications" et cliquez sur "New Application".
   - Donnez un nom à votre application et cliquez sur "Create".
   - Dans l'onglet "Bot", cliquez sur "Add Bot" et confirmez.
   - Copiez le "TOKEN" généré, vous en aurez besoin plus tard.
- Ajoutez le bot à votre serveur Discord :
   - Toujours dans l'onglet "OAuth2" de votre application, allez dans "URL Generator".
   - Cochez "bot" dans les scopes.
   - Sous "OAuth2 URL Generator", sélectionnez les permissions que vous souhaitez accorder à votre bot (par exemple, "Administrator" pour un accès complet).
   - Copiez l'URL générée et ouvrez-la dans votre navigateur pour inviter le bot sur votre serveur.

5. **Configurez les variables d'environnement :**

- Créez un fichier .env à la racine du projet.
- Ajoutez-y votre token :
  `DISCORD_TOKEN=Votre_Token_Ici`
## Utilisation

1. **Lancez le bot :**
   ```bash
    node .
   ```
   
2. **Commandes disponibles :**

- `!help` : Affiche la liste des commandes disponibles.
- `!ping` : Le bot répondra par "pong".
- `!quoi` : Le bot répondra par "feur".
- `!argent [montant]` : Le bot calculera le nombre de subs Twitch que vous pouvez offrir avec le montant spécifié.

## Développement

Si vous souhaitez ajouter de nouvelles commandes :
1. Ajoutez la fonction correspondante dans `commandes.js`.
2. Mettez à jour `commandes.json` pour inclure la nouvelle commande avec sa description.
3. Redémarrez le bot pour appliquer les modifications.

## Auteurs

- Nicolas Rouy
