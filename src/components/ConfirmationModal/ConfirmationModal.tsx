import './ConfirmationModal.scss';
import React, { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../shared/ui/button.tsx';

interface ConfirmationModalProps {
  children: ReactNode;
  show: boolean;
  onClose: (e: React.MouseEvent) => void;
  onYes: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { show, onClose, onYes, children }: ConfirmationModalProps = {
    ...props,
  };

  const modalElement = useMemo(
    () => document.getElementById('portal_root'),
    [show]
  );

  if (!modalElement) return null;
  return createPortal(
    <div className="logout " onClick={onClose}>
      <div
        className="logout--main text-charcoal bg-white dark:text-white dark:bg-charcoal"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{children}</p>
        <Button className="text-dark font-medium" onClick={onYes}>
          Yes
        </Button>
      </div>
    </div>,
    modalElement
  );
};

export default ConfirmationModal;
