import fs from 'fs';

export function quoi(ctx) {
    if (ctx.reply) {
        // Slash command
        ctx.reply('feur');
    } else {
        // Message classique
        ctx.channel.send('feur');
    }
}
export function ping(ctx) {
    if (ctx.reply) {
        ctx.reply('pong');
    } else {
        ctx.channel.send('pong');
    }
}
export function argent(message) {
    const args = message.content.split(' ');
    const prixSubs = {
        tier1: 4.99, // Prix d'un sub Twitch Tier 1 en USD
        tier2: 7.99, // Prix d'un sub Twitch Tier 2 en USD
        tier3: 19.99 // Prix d'un sub Twitch Tier 3 en USD
    };

    // Si l'argument n'est pas donné ou n'est pas un nombre
    if (args.length < 2 || isNaN(args[1])) {
        message.channel.send('⚠️ Veuillez entrer un montant valide après la commande ! Exemple: `!argent 50`');
        return;
    }

    const montant = parseFloat(args[1]);

    // Calcul du nombre de subs que l'utilisateur peut offrir pour chaque niveau
    const nombreDeSubTier1 = Math.floor(montant / prixSubs.tier1);
    const nombreDeSubTier2 = Math.floor(montant / prixSubs.tier2);
    const nombreDeSubTier3 = Math.floor(montant / prixSubs.tier3);

    // Répondre à l'utilisateur
    if (nombreDeSubTier1 > 0 || nombreDeSubTier2 > 0 || nombreDeSubTier3 > 0) {
        let response = `💰 Avec ${montant} EUR, vous pouvez offrir :\n`;
        if (nombreDeSubTier1 > 0) response += `- ${nombreDeSubTier1} sub(s) Twitch Tier 1\n`;
        if (nombreDeSubTier2 > 0) response += `- ${nombreDeSubTier2} sub(s) Twitch Tier 2\n`;
        if (nombreDeSubTier3 > 0) response += `- ${nombreDeSubTier3} sub(s) Twitch Tier 3\n`;
        message.channel.send(response);
    } else {
        message.channel.send('❌ Vous n\'avez pas assez d\'argent pour offrir un sub Twitch.');
    }
}
