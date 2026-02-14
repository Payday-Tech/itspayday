import type { Metadata } from 'next';
import ForWorkersContent from './ForWorkersContent';

export const metadata: Metadata = {
  title: 'For Workers | Payday',
  description: 'Payday for workers: fair, wage-linked credit with transparent pricing, clear limits, and multilingual support.',
};

export default function ForWorkers() {
  return <ForWorkersContent />;
}
