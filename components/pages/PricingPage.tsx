import React from 'react';
import { ArrowRightIcon, CheckIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useCurrency } from '../../contexts/CurrencyContext';

interface PricingPageProps {
  onPlanSelect: (role: 'user' | 'agent' | 'investor') => void;
}

type PlanRole = 'user' | 'agent' | 'investor';

const plans: Array<{
  role: PlanRole;
  name: string;
  eyebrow: string;
  price?: number;
  priceDetail: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}> = [
  {
    role: 'user',
    name: 'Explore',
    eyebrow: 'For property seekers',
    priceDetail: 'Always free',
    description: 'A calmer way to discover places that feel right and keep every decision organised.',
    features: ['Save and compare properties', 'Schedule property tours', 'Personalised matches', 'Private document vault'],
    cta: 'Create free account',
  },
  {
    role: 'agent',
    name: 'Partner',
    eyebrow: 'For property professionals',
    // Prices are stored in USD so the shared currency formatter can convert them.
    price: 50 / 18.5,
    priceDetail: 'per confirmed lead',
    description: 'A focused workspace for growing a credible property business and turning interest into action.',
    features: ['Unlimited property listings', 'Lead and enquiry management', 'AI listing assistant', 'Performance analytics'],
    cta: 'Join as an agent',
    featured: true,
  },
  {
    role: 'investor',
    name: 'Investor Pro',
    eyebrow: 'For serious investors',
    price: 1490 / 18.5,
    priceDetail: 'per month',
    description: 'A premium decision suite for evaluating opportunities with clarity and confidence.',
    features: ['Exclusive investment marketplace', 'Portfolio analysis', 'Advanced ROI tools', 'Investor community access'],
    cta: 'Start investing',
  },
];

const PricingPage: React.FC<PricingPageProps> = ({ onPlanSelect }) => {
  const { formatCurrency } = useCurrency();

  return (
    <div className="animate-fade-in overflow-hidden bg-[#f7f8f6] text-brand-dark dark:bg-slate-950 dark:text-white">
      <section className="relative isolate px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_50%_0%,rgba(16,132,115,0.20),transparent_62%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.14),transparent_62%)]" />
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary shadow-sm ring-1 ring-brand-primary/10 backdrop-blur dark:bg-slate-900/80">
            <SparklesIcon className="h-4 w-4" /> Memberships made simple
          </div>
          <h1 className="mt-7 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Find a plan built around your next move.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Start where you are today. Upgrade only when your property journey calls for more powerful tools.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32" aria-labelledby="plans-heading">
        <h2 id="plans-heading" className="sr-only">AfriEstate plans</h2>
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <article
              key={plan.role}
              className={`relative flex flex-col rounded-[2rem] p-7 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.38)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_-30px_rgba(15,23,42,0.5)] sm:p-9 ${
                plan.featured
                  ? 'bg-brand-dark text-white ring-1 ring-brand-primary/30 dark:bg-brand-primary'
                  : 'bg-white dark:bg-slate-900'
              }`}
            >
              {plan.featured && <span className="absolute right-7 top-7 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Most popular</span>}
              <p className={`text-xs font-bold uppercase tracking-[0.16em] ${plan.featured ? 'text-teal-200' : 'text-brand-primary'}`}>{plan.eyebrow}</p>
              <h3 className="mt-4 text-3xl font-black tracking-tight">{plan.name}</h3>
              <p className={`mt-4 min-h-14 text-sm leading-6 ${plan.featured ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}`}>{plan.description}</p>
              <div className="mt-8">
                <span className="text-4xl font-black tracking-tight">{plan.price === undefined ? 'Free' : formatCurrency(plan.price)}</span>
                <span className={`ml-2 text-sm font-medium ${plan.featured ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{plan.priceDetail}</span>
              </div>
              <ul className="mt-9 flex flex-1 flex-col gap-4" aria-label={`${plan.name} features`}>
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-3 text-sm font-medium ${plan.featured ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                    <CheckIcon className={`mt-0.5 h-5 w-5 shrink-0 ${plan.featured ? 'text-teal-200' : 'text-brand-primary'}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onPlanSelect(plan.role)}
                className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                  plan.featured
                    ? 'bg-white text-brand-dark hover:bg-teal-50 focus:ring-white dark:bg-slate-950 dark:text-white'
                    : 'bg-brand-primary text-white hover:bg-brand-secondary'
                }`}
              >
                {plan.cta} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl items-start justify-center gap-3 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
          <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
          <p>Clear pricing, no hidden platform fees. Your selected currency is reflected across the plans and your dashboard.</p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
