import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './GalleryModal.scss';
import { addDefaultSrc } from '../../services/utils.ts';

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

  const listElement = list.map((img) => (
    <img
      key={img}
      className="gallery_modal--list-member"
      src={img}
      onError={addDefaultSrc}
      alt=""
      onClick={() => setIndex(list.findIndex((member) => member === img))}
    />
  ));

  if (!modalElement) return null;
  return createPortal(
    <div className="gallery_modal" onClick={onClose}>
      <div className="gallery_modal--main" onClick={(e) => e.stopPropagation()}>
        {list.length > 1 && (
          <button
            onClick={() =>
              setIndex((prev) => (prev + list.length - 1) % list.length)
            }
          >
            &lt;
          </button>
        )}
        <img
          onClick={() =>
            setIndex((prev) => (prev + list.length - 1) % list.length)
          }
          className="gallery_modal--image"
          src={list.length ? list[index] : ''}
          alt=""
          onError={addDefaultSrc}
        />
        {list.length > 1 && (
          <button onClick={() => setIndex((prev) => (prev + 1) % list.length)}>
            &gt;
          </button>
        )}
      </div>
      {list.length > 1 && (
        <div className="gallery_modal--index">
          {index + 1}/{list.length}
        </div>
      )}
      <div className="gallery_modal--list" onClick={(e) => e.stopPropagation()}>
        {listElement}
      </div>
    </div>,
    modalElement
  );
};

export default GalleryModal;
