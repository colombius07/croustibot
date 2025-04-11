function quoi(message) {
    message.channel.send('feur');
}

function ping(message) {
    message.channel.send('pong');
}

function argent(message, args) {
    const prixSubs = {
        tier1: 4.99,
        tier2: 7.99,
        tier3: 19.99
    };

    if (args.length < 1 || isNaN(args[0])) {
        message.channel.send('⚠️ Veuillez entrer un montant valide après la commande ! Exemple: `!argent 50`');
        return;
    }

    const montant = parseFloat(args[0]);
    const nombreDeSubTier1 = Math.floor(montant / prixSubs.tier1);
    const nombreDeSubTier2 = Math.floor(montant / prixSubs.tier2);
    const nombreDeSubTier3 = Math.floor(montant / prixSubs.tier3);

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

module.exports = { quoi, ping, argent };
