import { useEffect, useState } from 'react';

type LightboxProps = {
  images: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
};

// Full-screen photo viewer (a modal window).
function Lightbox({ images, startIndex, alt, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const showNext = () => setIndex((i) => (i + 1) % images.length);
  const showPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // Keyboard: Esc closes, arrows switch photos.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (event.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // stop the page behind from scrolling

    // Cleanup: runs when the lightbox closes, so no listeners are left behind.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Product photos" onClick={onClose}>
      {/* stopPropagation: a click on the photo must not reach the dark background and close the modal */}
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close" autoFocus>
          ✕
        </button>
        <div className="lightbox__main">
          <img src={images[index]} alt={`${alt}, photo ${index + 1}`} />
          <button className="arrow arrow--prev" onClick={showPrev} aria-label="Previous photo">
            ‹
          </button>
          <button className="arrow arrow--next" onClick={showNext} aria-label="Next photo">
            ›
          </button>
        </div>
        <p className="lightbox__counter">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export default Lightbox;
