const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'bot.log');
const MAX_LINES = 500;

function log(...args) {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] ${args.join(' ')}`;

    console.log(message);

    // Lire le fichier pour vérifier le nombre de lignes
    fs.readFile(logFile, 'utf8', (err, data) => {
        if (!err && data) {
            const lines = data.split('\n');
            if (lines.length >= MAX_LINES) {
                fs.unlink(logFile, (err) => {
                    if (err) {
                        console.error('[Logger] Erreur lors de la suppression de bot.log :', err);
                    } else {
                        console.log('[Logger] bot.log supprimé (trop de lignes)');
                    }
                });
            }
        }

        // Ajouter la ligne même si le fichier vient d’être supprimé
        fs.appendFile(logFile, message + '\n', (err) => {
            if (err) {
                console.error('[Logger] Erreur d\'écriture dans bot.log :', err);
            }
        });
    });
}

module.exports = { log };
