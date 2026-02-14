'use client';

import { useModal } from './ModalContext';
import { useLanguage } from './LanguageContext';

interface GetStartedButtonProps {
  className?: string;
  children?: React.ReactNode;
  defaultHinglish?: boolean;
}

export default function GetStartedButton({
  className = 'button primary',
  children,
  defaultHinglish = true,
}: GetStartedButtonProps) {
  const { openModal } = useModal();
  const { setLanguage, t } = useLanguage();

  const handleClick = () => {
    if (defaultHinglish) {
      setLanguage('hng');
    }
    openModal();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children || t('cta.getStarted')}
    </button>
  );
}
