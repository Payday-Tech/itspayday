'use client';

import Image from 'next/image';
import { useState } from 'react';
import GetStartedButton from '@/components/GetStartedButton';
import { useLanguage } from '@/components/LanguageContext';

type Audience = 'worker' | 'community' | 'lender';

const audienceOrder: Audience[] = ['worker', 'community', 'lender'];

const faqItems = [
  { question: 'home.faq.q1', answer: 'home.faq.a1' },
  { question: 'home.faq.q2', answer: 'home.faq.a2' },
  { question: 'home.faq.q3', answer: 'home.faq.a3' },
] as const;

export default function Home() {
  const { t } = useLanguage();
  const [audience, setAudience] = useState<Audience>('worker');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const audienceConfig = {
    worker: {
      title: t('home.hero.worker.title'),
      subtitle: t('home.hero.worker.subtitle'),
      ctaLabel: t('home.hero.worker.cta'),
      ctaHref: '',
      benefits: [t('home.hero.worker.benefit1'), t('home.hero.worker.benefit2'), t('home.hero.worker.benefit3')],
    },
    community: {
      title: t('home.hero.community.title'),
      subtitle: t('home.hero.community.subtitle'),
      ctaLabel: t('home.hero.community.cta'),
      ctaHref: '/for-communities',
      benefits: [t('home.hero.community.benefit1'), t('home.hero.community.benefit2'), t('home.hero.community.benefit3')],
    },
    lender: {
      title: t('home.hero.lender.title'),
      subtitle: t('home.hero.lender.subtitle'),
      ctaLabel: t('home.hero.lender.cta'),
      ctaHref: '/for-lenders',
      benefits: [t('home.hero.lender.benefit1'), t('home.hero.lender.benefit2'), t('home.hero.lender.benefit3')],
    },
  } as const;

  const selected = audienceConfig[audience];

  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">{t('home.badge')}</div>
          <div className="audience-switcher" role="tablist" aria-label="Select audience type">
            {audienceOrder.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={audience === option}
                className={`audience-chip ${audience === option ? 'active' : ''}`}
                onClick={() => setAudience(option)}
              >
                {option === 'worker' ? t('home.audience.worker') : option === 'community' ? t('home.audience.community') : t('home.audience.lender')}
              </button>
            ))}
          </div>
          <h1>{selected.title}</h1>
          <p>{selected.subtitle}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            {audience === 'worker' ? (
              <GetStartedButton>{selected.ctaLabel}</GetStartedButton>
            ) : (
              <a className="button primary" href={selected.ctaHref}>{selected.ctaLabel}</a>
            )}
            <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">{t('cta.partner')}</a>
          </div>
          <ul className="hero-benefits small">
            {selected.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className="trust-microcopy">
            <span>{t('microcopy.lsp')}</span>
            <span>{t('microcopy.fees')}</span>
            <span>{t('microcopy.consent')}</span>
            <span>{t('microcopy.grievance')}</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <Image
              src="/api/home-hero-woman-phone"
              alt="An aspirational Indian domestic worker smiling at her phone"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 45vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>{t('home.howItWorksTitle')}</h2>
        <div className="how-it-works-row">
          <div className="step">
            <span>1</span>
            <div>
              <strong>{t('home.how.step1.title')}</strong>
              <p className="small">{t('home.how.step1.body')}</p>
            </div>
          </div>
          <div className="step">
            <span>2</span>
            <div>
              <strong>{t('home.how.step2.title')}</strong>
              <p className="small">{t('home.how.step2.body')}</p>
            </div>
          </div>
          <div className="step">
            <span>3</span>
            <div>
              <strong>{t('home.how.step3.title')}</strong>
              <p className="small">{t('home.how.step3.body')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>{t('home.faqTitle')}</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={item.question} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <span>{t(item.question)}</span>
                  <span className={`faq-arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">⌄</span>
                </button>
                {isOpen ? <p className="small faq-answer">{t(item.answer)}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
