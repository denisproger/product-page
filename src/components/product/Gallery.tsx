import { useState } from 'react';
import Lightbox from './Lightbox';

type GalleryProps = {
  images: string[];
  alt: string;
};

function Gallery({ images, alt }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // % (remainder) keeps the index inside the array: after the last photo comes the first again.
  const showNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const showPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="gallery">
      <div className="gallery__main">
        <button className="gallery__open" onClick={() => setIsLightboxOpen(true)} aria-label="Open photo in full size">
          <img src={images[activeIndex]} alt={`${alt}, photo ${activeIndex + 1} of ${images.length}`} />
        </button>
        <button className="arrow arrow--prev" onClick={showPrev} aria-label="Previous photo">
          ‹
        </button>
        <button className="arrow arrow--next" onClick={showNext} aria-label="Next photo">
          ›
        </button>
      </div>

      <ul className="gallery__thumbs">
        {images.map((src, index) => (
          <li key={src}>
            <button
              className={`gallery__thumb ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img src={src} alt="" />
            </button>
          </li>
        ))}
      </ul>

      {isLightboxOpen && (
        <Lightbox images={images} startIndex={activeIndex} alt={alt} onClose={() => setIsLightboxOpen(false)} />
      )}
    </div>
  );
}

export default Gallery;
