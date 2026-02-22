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

  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">LSP-led financial access</div>
          <h1>{t('home.hero.worker.title')}</h1>
          <p>{t('home.hero.worker.subtitle')}</p>
          <div className="hero-actions">
            <GetStartedButton>{t('home.hero.worker.cta')}</GetStartedButton>
            <a className="button secondary" href="mailto:partnerships@itspayday.in" rel="noopener noreferrer">{t('cta.partner')}</a>
          </div>
          <p className="small" style={{ marginTop: '12px' }}>
            Payday is a Lending Service Provider. Loans are issued by regulated partner lenders after consent and eligibility checks.
          </p>
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
          <div className="step"><span>1</span><div><strong>{t('home.how.step1.title')}</strong><p className="small">{t('home.how.step1.body')}</p></div></div>
          <div className="step"><span>2</span><div><strong>{t('home.how.step2.title')}</strong><p className="small">{t('home.how.step2.body')}</p></div></div>
          <div className="step"><span>3</span><div><strong>{t('home.how.step3.title')}</strong><p className="small">{t('home.how.step3.body')}</p></div></div>
        </div>
      </section>

      <section className="section-alt">
        <h2>{t('home.faqTitle')}</h2>
        <div className="steps">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={item.question} className="timeline-item" style={{ display: 'block' }}>
                <button
                  type="button"
                  className="button-link"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  style={{ width: '100%', justifyContent: 'space-between', background: 'transparent', border: 'none', padding: 0, textAlign: 'left' }}
                >
                  <span>{t(item.question)}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen ? <p className="small" style={{ marginTop: '10px' }}>{t(item.answer)}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
