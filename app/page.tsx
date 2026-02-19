'use client';

import Image from 'next/image';
import { useState } from 'react';
import GetStartedButton from '@/components/GetStartedButton';
import { useLanguage } from '@/components/LanguageContext';

const faqItems = [
  { question: 'home.faq.q1', answer: 'home.faq.a1' },
  { question: 'home.faq.q2', answer: 'home.faq.a2' },
  { question: 'home.faq.q3', answer: 'home.faq.a3' },
  { question: 'home.faq.q4', answer: 'home.faq.a4' },
  { question: 'home.faq.q5', answer: 'home.faq.a5' },
] as const;

export default function Home() {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const selected = {
    title: t('home.hero.worker.title'),
    subtitle: t('home.hero.worker.subtitle'),
    ctaLabel: t('home.hero.worker.cta'),
  };

  return (
    <main>
      <section className="hero">
        <div>
          <h1>{selected.title}</h1>
          <p>{selected.subtitle}</p>
          <div className="badge">{t('home.badge')}</div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <GetStartedButton>{selected.ctaLabel}</GetStartedButton>
            <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">{t('cta.partner')}</a>
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
