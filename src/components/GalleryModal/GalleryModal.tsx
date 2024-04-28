import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './GalleryModal.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import BackIcon from '../../assets/icons/back.svg?react';

interface GalleryModalProps {
  list: string[];
  i: number;
  onClose: (e: React.MouseEvent) => void;
}

const GalleryModal = (props: GalleryModalProps) => {
  const { list, i, onClose }: GalleryModalProps = {
    ...props,
  };

  const [index, setIndex] = useState(i);
  const modalElement = useMemo(
    () => document.getElementById('portal_root'),
    [i]
  );

  const listElement = list.map((img, i) => (
    <img
      key={'gallery-' + i}
      className="gallery--list_member"
      src={img}
      onError={addDefaultSrc}
      alt=""
      onClick={() => setIndex(i)}
    />
  ));

  if (!modalElement) return null;
  return createPortal(
    <div className="gallery" onClick={onClose}>
      {list.length > 1 && (
        <div className="gallery--index">
          {index + 1}/{list.length}
        </div>
      )}
      <div className="gallery--main" onClick={(e) => e.stopPropagation()}>
        {list.length > 1 && (
          <button
            onClick={() =>
              setIndex((prev) => (prev + list.length - 1) % list.length)
            }
          >
            <BackIcon width={53} />
          </button>
        )}
        <img
          onClick={() => setIndex((prev) => (prev + 1) % list.length)}
          className="gallery--image"
          src={list.length ? list[index] : ''}
          alt=""
          onError={addDefaultSrc}
        />
        {list.length > 1 && (
          <button onClick={() => setIndex((prev) => (prev + 1) % list.length)}>
            <BackIcon width={53} className="rotate-180" />
          </button>
        )}
      </div>
      {list.length > 1 && (
        <div className="gallery--list" onClick={(e) => e.stopPropagation()}>
          {listElement}
        </div>
      )}
    </div>,
    modalElement
  );
};

export default GalleryModal;
