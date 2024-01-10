import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import './GalleryModal.scss';

interface GalleryModalProps {
  image: string;
  onClose: (e: React.MouseEvent) => void;
}

const GalleryModal = (props: GalleryModalProps) => {
  const { image, onClose }: GalleryModalProps = { ...props };

  const modalElement = useMemo(
    () => document.getElementById('portal_root'),
    [image]
  );

  if (!image || !modalElement) return null;
  return createPortal(
    <div className="gallery_modal" onClick={onClose}>
      <img className="gallery_modal--image" src={'https://' + image} alt="" />
    </div>,
    modalElement
  );
};

export default GalleryModal;
