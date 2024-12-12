import { useRef, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import styles from "../../pages/Project/Project.module.css";
import SpyPhi from "../../assets/spyphi.png";
import SpyPhiStand from "../../assets/Spyphi-stand.png";
import CancerImage from "../../assets/cancer-image.png";

const slides = [
  {
    title: "Håndholdt infrarød laser",
    image: SpyPhi,
  },
  {
    title: "Apparatur til nøjagtig kortlægning af hudcancer", 
    image: SpyPhiStand,
  },
  {
    title: "Kræftramt område",
    image: CancerImage,
  },
];

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const slideWidth = slider.clientWidth;
      const scrollPosition = slider.scrollLeft;
      Math.round(scrollPosition / slideWidth);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  if (!slides.length) {
    return <div>Ingen billeder at vise</div>;
  }

  return (
    <div
      className={styles.sliderContainer}
      role="region"
      aria-label="Billede galleri"
    >
      <div ref={sliderRef} className={styles.sliderStyles}>
        {slides.map((slide, index) => (
          <m.div
            key={index}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.slideNumber}>{index + 1}</div>
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={styles.slideImage}
                  loading="eager"
                  onClick={() => handleImageClick(slide.image)}
                  onKeyDown={(e) => e.key === 'Enter' && handleImageClick(slide.image)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Åbn ${slide.title} i fuld skærm`}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
            <div className={styles.slideContent}>
            <div className={styles.horizontalLine}></div>
              <h3>{slide.title}</h3>
            </div>
          </m.div>
        ))}
      </div>

      {fullscreenImage && (
        <m.div
          className={styles.fullscreenModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseFullscreen}
          onKeyDown={(e) => e.key === 'Escape' && handleCloseFullscreen()}
          tabIndex={0}
          role="button"
          aria-label="Luk fuldskærmsvisning"
        >
          <img
            src={fullscreenImage}
            alt="Fuldskærmsvisning"
            className={styles.fullscreenImage}
          />
        </m.div>
      )}
    </div>
  );
};

export default ImageSlider;
