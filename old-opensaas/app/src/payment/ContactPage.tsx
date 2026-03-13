import { useAuth } from 'wasp/client/auth';
import { generateCheckoutSession, getCustomerPortalUrl, useQuery, sendEmail } from 'wasp/client/operations';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from './plans';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../client/cn';

const bestDealPaymentPlanId = PaymentPlanId.Credits10;

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const paymentPlanCards = {
  [PaymentPlanId.Hobby]: {
    name: 'Inscription Type 1',
    price: '254€',
    description: 'Entraînements LUNDI MARDI et SAMEDI',
    features: [
      'Entraînements de natation du LUNDI avec entraîneur',
      'Entraînements de course à pied du MARDI avec entraîneur',
      'Séances de groupe de vélo organisées par les membres',
    ],
  },
  [PaymentPlanId.Pro]: {
    name: 'Inscription Type 2',
    price: '254€',
    description: 'Entraînements MARDI JEUDI et SAMEDI',
    features: [
      'Entraînements de natation du JEUDI avec entraîneur',
      'Entraînements de course à pied du MARDI avec entraîneur',
      'Séances de groupe de vélo organisées par les membres',
    ],
  },
  [PaymentPlanId.Credits10]: {
    name: 'Inscription Type 3',
    price: '297€',
    description: 'Entraînements LUNDI, MARDI, JEUDI et SAMEDI',
    features: [
      'Entraînements de natation du LUNDI et du JEUDI avec entraîneur',
      'Entraînements de course à pied du MARDI avec entraîneur',
      'Séances de groupe de vélo organisées par les membres',
    ],
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    phone: '',
    email: '',
    sportsLevel: '',
    sportsExperience: '',
    sportsGoals: '',
    subscriptionType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendEmail(formData);
      alert("Formulaire envoyé avec succès ! Vous serez recontacté très prochainement.");
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        phone: '',
        email: '',
        sportsLevel: '',
        sportsExperience: '',
        sportsGoals: '',
        subscriptionType: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      alert("Erreur lors de l'envoi du formulaire.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="py-10 lg:mt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white text-center">
            Inscription au Club de Triathlon
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-center text-lg leading-8">
            Veuillez remplir le formulaire ci-dessous pour vous inscrire.<br />
            <div className="bg-red-500 text-white text-center py-4 mb-8">
              <p className="text-lg font-bold">Attention : Le nombre de places au club est limité en raison des infrastructures disponibles. Ce formulaire ne constitue pas une inscription définitive, mais une demande d'inscription.</p>
            </div>
          </p>
        </div>

        <div id="contact-form" className='mt-10'>
          <div className='rounded-sm border border-gray-900/10 dark:border-gray-100/10 bg-white shadow-default dark:bg-boxdark'>
            <div className='border-b border-gray-900/10 dark:border-gray-100/10 py-4 px-6.5'>
              <h3 className='font-medium text-gray-900 dark:text-white'>Formulaire d'Inscription</h3>
            </div>
            <form onSubmit={handleSubmit} className='p-6.5'>
              <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                <div className='w-full xl:w-1/2'>
                  <label className='mb-2.5 block text-gray-900 dark:text-white'>Prénom</label>
                  <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Entrez votre prénom' required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input' />
                </div>
                <div className='w-full xl:w-1/2'>
                  <label className='mb-2.5 block text-gray-900 dark:text-white'>Nom</label>
                  <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Entrez votre nom' required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input' />
                </div>
              </div>
              <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                <div className='w-full xl:w-1/2'>
                  <label className='mb-2.5 block text-gray-900 dark:text-white'>Date de Naissance</label>
                  <input type='date' name='birthDate' value={formData.birthDate} onChange={handleChange} required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input' />
                </div>
                <div className='w-full xl:w-1/2'>
                  <label className='mb-2.5 block text-gray-900 dark:text-white'>Adresse Postale</label>
                  <input type='text' name='address' value={formData.address} onChange={handleChange} placeholder='Entrez votre adresse postale' required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input' />
                </div>
              </div>
              <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                <div className='w-full xl:w-1/2'>
                  <label className='mb-2.5 block text-gray-900 dark:text-white'>Téléphone</label>
                  <input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder='Entrez votre numéro de téléphone' required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input' />
                </div>
                <div className='w-full xl:w-1/2'>
                  <label className='mb-2.5 block text-gray-900 dark:text-white'>Email</label>
                  <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Entrez votre adresse email' required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input' />
                </div>
              </div>
              <div className='mb-4.5'>
                <label className='mb-2.5 block text-gray-900 dark:text-white'>Niveau de Pratique</label>
                <select name='sportsLevel' value={formData.sportsLevel} onChange={handleChange} required className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input'>
                  <option value="">Sélectionnez votre niveau</option>
                  <option value="débutant">Débutant</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </select>
              </div>
              <div className='mb-4.5'>
                <label className='mb-2.5 block text-gray-900 dark:text-white'>Expérience Sportive</label>
                <textarea name='sportsExperience' value={formData.sportsExperience} onChange={handleChange} placeholder='Décrivez votre expérience en triathlon ou dans d’autres sports' required rows={4} className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input'></textarea>
              </div>
              <div className='mb-4.5'>
                <label className='mb-2.5 block text-gray-900 dark:text-white'>Objectifs Sportifs</label>
                <textarea name='sportsGoals' value={formData.sportsGoals} onChange={handleChange} placeholder='Quels sont vos objectifs sportifs ?' required rows={4} className='w-full rounded border-[1.5px] border-gray-900/10 dark:border-gray-100/10 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-[#747bcb] active:border-[#747bcb] dark:bg-form-input'></textarea>
              </div>
              <div className='mb-4.5'>
                <label className='mb-2.5 block text-gray-900 dark:text-white'>Type d'Inscription</label>
                <div className='flex gap-4'>
                  <label>
                    <input type='radio' name='subscriptionType' value='Inscription type 1' onChange={handleChange} required />
                    Inscription type 1
                  </label>
                  <label>
                    <input type='radio' name='subscriptionType' value='Inscription type 2' onChange={handleChange} />
                    Inscription type 2
                  </label>
                  <label>
                    <input type='radio' name='subscriptionType' value='Inscription type 3' onChange={handleChange} />
                    Inscription type 3
                  </label>
                </div>
              </div>
              <div className='mt-6'>
                <button type='submit' disabled={isSubmitting} className='w-full rounded-lg border border-[#747bcb] py-3 px-5 text-sm font-medium text-[#747bcb] hover:bg-[#747bcb] hover:text-white'>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: user } = useAuth();
  const isUserSubscribed = !!user && !!user.subscriptionStatus && user.subscriptionStatus !== 'deleted';

  const {
    data: customerPortalUrl,
    isLoading: isCustomerPortalUrlLoading,
    error: customerPortalUrlError,
  } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed });

  const navigate = useNavigate();

  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      setIsPaymentLoading(true);

      const checkoutResults = await generateCheckoutSession(paymentPlanId);

      if (checkoutResults?.sessionUrl) {
        window.open(checkoutResults.sessionUrl, '_self');
      } else {
        throw new Error('Error generating checkout session URL');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Error processing payment. Please try again later.');
      setIsPaymentLoading(false);
    }
  }

  const handleCustomerPortalClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (customerPortalUrlError) {
      setErrorMessage('Error fetching Customer Portal URL');
      return;
    }

    if (!customerPortalUrl) {
      setErrorMessage(`Customer Portal does not exist for user ${user.id}`);
      return;
    }

    window.open(customerPortalUrl, '_blank');
  };

  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Avertissement d'inscription */}
        <div className="bg-red-500 text-white text-center py-4 mb-8">
          <p className="text-lg font-bold">Attention : Les inscriptions ne sont pas encore ouvertes. Elles seront accessibles à partir du 30 juin 2025.</p>
        </div>
        <div id='pricing' className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            Rejoignez le <span className='text-[#747bcb]'>Club de Triathlon</span> de Rueil-Malmaison
          </h2>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
          Vous avez plus de 18 ans et savez déjà nager ? Que vous soyez débutant ou expérimenté, le Club de Triathlon de Rueil-Malmaison vous accueille. Profitez d’entraînements adaptés et d’une ambiance conviviale ! Inscrivez-vous dès maintenant pour réserver votre place : 50 places disponibles. <br />
        </p>
        {errorMessage && (
          <div className='mt-8 p-4 bg-red-100 text-red-600 rounded-md dark:bg-red-200 dark:text-red-800'>
            {errorMessage}
          </div>
        )}
        <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:gap-x-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {Object.values(PaymentPlanId).map((planId) => (
            <div
              key={planId}
              className={cn(
                'relative flex flex-col grow justify-between rounded-3xl ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden p-8 xl:p-10',
                {
                  'ring-2': planId === bestDealPaymentPlanId,
                  'ring-1 lg:mt-8': planId !== bestDealPaymentPlanId,
                }
              )}
            >
              {planId === bestDealPaymentPlanId && (
                <div
                  className='absolute top-0 right-0 -z-10 w-full h-full transform-gpu blur-3xl'
                  aria-hidden='true'
                >
                  <div
                    className='absolute w-full h-full bg-gradient-to-br from-amber-400 to-purple-300 opacity-30 dark:opacity-50'
                    style={{
                      clipPath: 'circle(670% at 50% 50%)',
                    }}
                  />
                </div>
              )}
              <div className='mb-8'>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 id={planId} className='text-gray-900 text-lg font-semibold leading-8 dark:text-white'>
                    {paymentPlanCards[planId].name}
                  </h3>
                </div>
                <p className='mt-4 text-sm leading-6 text-gray-600 dark:text-white'>
                  {paymentPlanCards[planId].description}
                </p>
                <p className='mt-6 flex items-baseline gap-x-1 dark:text-white'>
                  <span className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {paymentPlanCards[planId].price}
                  </span>
                  <span className='text-sm font-semibold leading-6 text-gray-600 dark:text-white'>
                    {paymentPlans[planId].effect.kind === 'subscription' && '/an'}
                  </span>
                </p>
                <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-white'>
                  {paymentPlanCards[planId].features.map((feature) => (
                    <li key={feature} className='flex gap-x-3'>
                      <AiFillCheckCircle className='h-6 w-5 flex-none text-[#747bcb]' aria-hidden='true' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default PricingPage;
