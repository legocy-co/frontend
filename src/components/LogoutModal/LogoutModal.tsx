import './LogoutModal.scss';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../shared/ui/button.tsx';
import { authService } from '../../services/AuthService.ts';

interface Props {
  show: boolean;
  onClose: (e: React.MouseEvent) => void;
}

const LogoutModal = (props: Props) => {
  const { show, onClose }: Props = {
    ...props,
  };

  const modalElement = useMemo(
    () => document.getElementById('portal_root'),
    [show]
  );

  function handleYes(e: React.MouseEvent) {
    onClose(e);
    authService.Logout();
  }

  if (!modalElement) return null;
  return createPortal(
    <div className="logout" onClick={onClose}>
      <div className="logout--main" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to log out?</p>
        <Button className="text-dark font-medium" onClick={(e) => handleYes(e)}>
          Yes
        </Button>
      </div>
    </div>,
    modalElement
  );
};

export default LogoutModal;
