const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true pour le port 465, false pour les autres ports
    auth: {
        user: 'florian.even@rueil-malmaison-triathlon.fr',
        pass: 'djng zmxv smge pjuh'
    }
});

// Options de l'email
const mailOptions = {
    from: 'florian.even@rueil-malmaison-triathlon.fr',
    to: 'florian.even@rueil-malmaison-triathlon.fr', // Remplacez par votre adresse email pour le test
    subject: 'Test SMTP',
    text: 'Ceci est un test pour vérifier la configuration SMTP.'
};

// Envoyer l'email
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Erreur lors de l\'envoi de l\'email :', error);
    } else {
        console.log('Email envoyé avec succès :', info.response);
    }
});

