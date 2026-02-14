'use client';

import Image from 'next/image';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';
import { useLanguage } from '@/components/LanguageContext';

export default function ForWorkersContent() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">{t('worker.badge')}</div>
          <h1>{t('worker.hero.title')}</h1>
          <p>{t('worker.hero.subtitle')}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <GetStartedButton>{t('cta.whatsappGetStarted')}</GetStartedButton>
            <Link className="button secondary" href="/fees">{t('cta.seeFees')}</Link>
          </div>
          <div className="trust-microcopy" style={{ marginTop: '14px' }}>
            <span>{t('microcopy.lsp')}</span>
            <span>{t('microcopy.fees')}</span>
            <span>{t('microcopy.consent')}</span>
            <span>{t('microcopy.grievance')}</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Worker illustration"
            width={960}
            height={640}
          />
          <div className="trust-box">
            <strong>{t('worker.trust.title')}</strong>
            <p className="small">{t('worker.trust.subtitle')}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Simple benefits</h3>
            <p className="small">Access your earned wages for urgent needs while staying in control of your budget.</p>
          </div>
          <div className="card">
            <h3>Safe limits</h3>
            <p className="small">Caps and reminders ensure you never borrow beyond what you&apos;ve already earned.</p>
          </div>
          <div className="card">
            <h3>Privacy-first</h3>
            <p className="small">We only use data you consent to, and you can revoke access anytime.</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>{t('worker.faqTitle')}</h2>
        <div className="card-grid">
          <div className="card">
            <h3>{t('worker.faq.q1')}</h3>
            <p className="small">{t('worker.faq.a1')}</p>
          </div>
          <div className="card">
            <h3>{t('worker.faq.q2')}</h3>
            <p className="small">{t('worker.faq.a2')}</p>
          </div>
          <div className="card">
            <h3>{t('worker.faq.q3')}</h3>
            <p className="small">{t('worker.faq.a3')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
