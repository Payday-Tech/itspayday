'use client';

import { useModal } from './ModalContext';
import { useLanguage } from './LanguageContext';

interface GetStartedButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GetStartedButton({ className = 'button primary', children }: GetStartedButtonProps) {
  const { openModal } = useModal();
  const { t } = useLanguage();

  return (
    <button className={className} onClick={openModal}>
      {children || t('cta.getStarted')}
    </button>
  );
}
