import styles from "./Auktion.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useState,} from 'react';
import cardsData from "./cardsData";

import Hammer from "../../assets/hammerslag.svg"


const Auktion = () => {

const [visibleCards, setVisibleCards] = useState(9); // Start med 9 kort

  const loadMoreCards = () => {
    setVisibleCards((prevVisible) => prevVisible + 9); // Indlæs 9 kort mere
  };
    return (
<>

<Breadcrumb />

<div className={styles.auktionContainer}>
<div className={styles.auktionTekst}>
    <h1> <bold>Ekslusiv</bold> auktion</h1>
    <hr className={styles['auktion-divider']} />
    <p>Alle midler der indsamles går ubeskåret til årets projekt, så vær med til at give en gave til alle i Vejle. En gave, der kan give mange vejlensere et bedre liv, gennem en hurtigere, meget mindre smertefuld og mere tryg behandling af hudcancer. Så lad os kæmpe sammen og lave et brag af en indsamling - så vi kan hjælpe flest muligt godt og hurtigt igennem en sygdomsperiode med hudcancer.</p>
</div>
<div className={styles.auktionBillede}>
<img src={Hammer} alt="" />
</div>
</div>

<div className={styles.cardContainer}>
        {cardsData.slice(0, visibleCards).map((card) => (
          <div key={card.id} className={styles.Gallacard}>
            <img src={card.image} alt="Card image" className={styles.GallacardImageTop} />
            <h2 className={styles.GallacardHeadline}>{card.headline}</h2>
            <hr className={styles['card-divider']} />
            <p className={styles.GallacardText}>{card.text}</p>
            <div className={styles.GallacardBottom}>
              <img src={card.bottomImage} alt="Bottom image" className={styles.GallacardImageBottom} />
              <div className={styles.GallacardPrice}>{card.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles['back']}>
      {visibleCards < cardsData.length && (
        <button onClick={loadMoreCards} className={styles.loadMoreButton}>
          Indlæs Flere
        </button>
      )}
      </div>
</>
    );
};

export default Auktion;