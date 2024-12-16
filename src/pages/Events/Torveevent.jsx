import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from './Torveevent.module.css';
import TorveDato from "../../assets/TorveDato.svg"
import TorveInfoGraphic from "../../assets/torveevent-infographic.svg"
import Poly from "../../assets/polyprint.png"
import TorveInfoMobil from "../../assets/TorveInfo-Mobil.svg"
import { useState, useEffect,} from 'react';

// Billeder til slider
import Torve1 from "../../assets/Torve1.png"
import Torve2 from "../../assets/Torve2.jpg"
import Torve3 from "../../assets/Torve3.jpg"
import { Link } from "react-router-dom";


const Torveevent = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [Torve1, Torve2, Torve3];
  
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Skifter billede hver 5. sekund
        return () => clearInterval(interval);
      }, [images.length]);
    
      const handleDotClick = (index) => {
        setCurrentImageIndex(index);
      };


    return (
<>
<Breadcrumb />
<div className={styles['torveevent-intro-container']}>
<div className={styles['torveevent-intro-venstre']}>

<div className={styles['torveevent-venstre-tekst']}>
<h1> <bold>"Knast, sår & plet - Dag"</bold>  <br />
på rådhustorvet i vejle</h1>
<hr className={styles['torve-divider']} />
<p>Knast, sår og plet dag 2024, blev afholdt lørdag den 20. april. Vi er i gang <br />
 med planlægning af en dato i foråret 2025.
</p>
<p> <bold>Dato vil blive opdateret her og på</bold> <a href="">Facebook.</a></p>
</div>

<div className={styles['torveevent-venstre-slider']}>
        <img src={images[currentImageIndex]} alt="Knast, sår & plet" />
        <div className={styles['dots-container']}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles['dot']} ${index === currentImageIndex ? styles['active-dot'] : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

</div>

<div className={styles['torveevent-intro-hojre']}>
<div className={styles['torveevent-hojre-billede']}>
<img src={TorveDato} alt="" />
</div>

<div className={styles['torveevent-hojre-stats']}>
<div className={styles['torveevent-hojre-305']}>
<h1>305</h1>
<p>Blev undersøgt <br />
af en læge</p>
</div>
<div className={styles['torveevent-hojre-25']}>
<h1>25</h1>
<p>Fik en tid <br />
på vejle sygehus</p>
</div>
<div className={styles['torveevent-hojre-2']}>
<h1>2</h1>
<p>Kom direkte <br />
på kræftpakke</p>
</div>
</div>
</div>
</div>

<div className={styles['torveevent-infographic']}>
    <img src={TorveInfoGraphic} alt="" />
</div>
<div className={styles['torveevent-infographic-mobil']}>
    <img src={TorveInfoMobil} alt="" />
</div>

<div className={styles['torve-sponsor']}>
            <h1>Sponsorer</h1>
            <hr className={styles['torve-divider']} />
            <p>Af Torveeventet</p>
            <img src={Poly} alt="" />
        </div>
<div className={styles['torveknap-container']}>
<div className={styles['torveknaper']}>
    <Link to="/sponsorer" className={styles['torve-alle-sponsor']}>Alle Sponsorer</Link>
    </div>
    <div className={styles['torveknaper']}>
    <Link to="/sponsorer" className={styles['torve-bliv-sponsor']}>Bliv Sponsor</Link>
    </div>
        </div>
</>
    );
};

export default Torveevent;