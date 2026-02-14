'use client';

import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { ModalProvider, useModal } from './ModalContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: ClientLayoutProps) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Header onOpenModal={openModal} />
      {children}
      <Footer />
      <Modal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ModalProvider>
  );
}
