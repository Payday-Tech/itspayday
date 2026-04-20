'use client';

import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { ModalProvider, useModal } from './ModalContext';
import { LanguageProvider } from './LanguageContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: ClientLayoutProps) {
  const { isOpen, closeModal } = useModal();

  return (
    <>
      <Header />
      {children}
      <Footer />
      <Modal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LanguageProvider>
      <ModalProvider>
        <LayoutContent>{children}</LayoutContent>
      </ModalProvider>
    </LanguageProvider>
  );
}
