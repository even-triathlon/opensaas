import type { GenerateCheckoutSession, GetCustomerPortalUrl } from 'wasp/server/operations';
import { PaymentPlanId, paymentPlans } from '../payment/plans';
import { paymentProcessor } from './paymentProcessor';
import { HttpError } from 'wasp/server';

export type CheckoutSession = {
  sessionUrl: string | null;
  sessionId: string;
};

export const generateCheckoutSession: GenerateCheckoutSession<PaymentPlanId, CheckoutSession> = async (
  paymentPlanId,
  context
) => {
  // Utilisation de valeurs par défaut si context.user n'est pas disponible
  const userId = context.user?.id || 'defaultUserId';
  const userEmail = context.user?.email || 'generic@example.com';

  const paymentPlan = paymentPlans[paymentPlanId];
  const { session } = await paymentProcessor.createCheckoutSession({
    userId,
    userEmail,
    paymentPlan,
    prismaUserDelegate: context.entities.User
  });

  return {
    sessionUrl: session.url,
    sessionId: session.id,
  };
};

export const getCustomerPortalUrl: GetCustomerPortalUrl<void, string | null> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return paymentProcessor.fetchCustomerPortalUrl({
    userId: context.user.id,
    prismaUserDelegate: context.entities.User,
  });
};
