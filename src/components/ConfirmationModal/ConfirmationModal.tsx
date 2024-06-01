import './ConfirmationModal.scss';
import React, { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../shared/ui/button.tsx';
import clsx from 'clsx';

interface ConfirmationModalProps {
  children: ReactNode;
  show: boolean;
  onClose: (e: React.MouseEvent) => void;
  showYes?: boolean;
  onYes?: () => void;
  className?: string;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    show,
    onClose,
    onYes,
    children,
    showYes = true,
    className,
  }: ConfirmationModalProps = {
    ...props,
  };

  const modalElement = useMemo(
    () => document.getElementById('portal_root'),
    [show]
  );

  if (!modalElement) return null;
  return createPortal(
    <div className="logout" onClick={onClose}>
      <div
        className={clsx(
          'logout--main text-confirmmodal bg-white dark:text-white dark:bg-confirmmodal',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {showYes && (
          <Button className="text-dark font-medium" onClick={onYes}>
            Yes
          </Button>
        )}
      </div>
    </div>,
    modalElement
  );
};

export default ConfirmationModal;
