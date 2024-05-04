const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware pour traiter les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Servir des fichiers statiques (HTML, CSS)
app.use(express.static('public'));

// Route pour gérer les soumissions de formulaires d'abonnement
app.post('/subscribe', (req, res) => {
    const { name, email, 'abonnement-type': abonnementType } = req.body;

    // Traitez l'abonnement en fonction du type d'abonnement
    if (abonnementType === 'standard') {
        // Traiter le tarif standard
        console.log(`Abonnement standard: Nom: ${name}, Email: ${email}`);
    } else if (abonnementType === 'etudiant') {
        // Traiter le tarif étudiant
        console.log(`Abonnement étudiant: Nom: ${name}, Email: ${email}`);
    } else if (abonnementType === 'journaliste') {
        // Traiter le tarif journaliste
        console.log(`Abonnement journaliste: Nom: ${name}, Email: ${email}`);
    }

    // Envoyer une réponse au client
    res.send('Abonnement réussi !');
});

// Démarrer le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
