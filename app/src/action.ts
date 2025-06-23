import { emailSender } from "wasp/server/email";
import { type SendEmail } from 'wasp/server/operations';

// Définir les types pour la réponse
interface SendEmailResponse {
  message: string;
  [key: string]: any; // Ajouter une signature d'index pour la compatibilité avec SuperJSONObject
}

// Implémenter l'action sendEmail avec les données dynamiques du formulaire
export const sendEmail: SendEmail<{
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  phone: string;
  email: string;
  sportsLevel: string;
  sportsExperience: string;
  sportsGoals: string;
  subscriptionType: string;
}, SendEmailResponse> = async ({
  firstName,
  lastName,
  birthDate,
  address,
  phone,
  email,
  sportsLevel,
  sportsExperience,
  sportsGoals,
  subscriptionType
}): Promise<SendEmailResponse> => {
  const to = "florian.even@neutron-it.fr";
  const subject = `Nouvelle demande d'inscription au Club de Triathlon de ${firstName} ${lastName}`;
  const text = `
    Prénom: ${firstName}
    Nom: ${lastName}
    Date de Naissance: ${birthDate}
    Adresse: ${address}
    Téléphone: ${phone}
    Email: ${email}
    Niveau de Pratique: ${sportsLevel}
    Expérience Sportive: ${sportsExperience}
    Objectifs Sportifs: ${sportsGoals}
    Type d'Inscription: ${subscriptionType}
  `;

  const html = `
    <p><strong>Prénom:</strong> ${firstName}</p>
    <p><strong>Nom:</strong> ${lastName}</p>
    <p><strong>Date de Naissance:</strong> ${birthDate}</p>
    <p><strong>Adresse:</strong> ${address}</p>
    <p><strong>Téléphone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Niveau de Pratique:</strong> ${sportsLevel}</p>
    <p><strong>Expérience Sportive:</strong> ${sportsExperience}</p>
    <p><strong>Objectifs Sportifs:</strong> ${sportsGoals}</p>
    <p><strong>Type d'Inscription:</strong> ${subscriptionType}</p>
  `;

  await emailSender.send({ to, subject, text, html });
  return { message: 'Email envoyé avec succès !' };
};
