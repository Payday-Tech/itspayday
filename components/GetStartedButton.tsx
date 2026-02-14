'use client';

import { useModal } from './ModalContext';

interface GetStartedButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GetStartedButton({
  className = 'button primary',
  children = 'Apply for Loan'
}: GetStartedButtonProps) {
  const { openModal } = useModal();

  return (
    <button className={className} onClick={openModal}>
      {children}
    </button>
  );
}
