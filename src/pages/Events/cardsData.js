import Loungestol from "../../assets/loungestol.svg";
import Natures from "../../assets/Natures-collection.svg";
import Jelling from "../../assets/Jelling.png";
import Jellingtekst from "../../assets/jellingtekst.png";
import EventPark from "../../assets/Eventpark.svg";
import Spa from "../../assets/Spa.svg";
import HotelVejleFjord from "../../assets/HotelVejleFjord.svg";
import Kolagen from "../../assets/kollagen.png";
import Nutrinic from "../../assets/nutrinic.png";
import Munkebjerg from "../../assets/Mukebjerg.png";
import Fisk from "../../assets/Fisk.svg";
import Fiskehus from "../../assets/Fiskehus.svg";
import Olie from "../../assets/olie.svg";
import OlieLogo from "../../assets/olielogo.svg";
import Yoga from "../../assets/yoga.jpg";
import Yogilates from "../../assets/yogilates.png";
import Ferie from "../../assets/ferie.jpg";
import Provacances from "../../assets/provacances.svg";
import Mad from "../../assets/mad.avif";
import Madindustrien from "../../assets/madindustrien.png";
import GuldsmedButik from "../../assets/GuldsmedGram.jpg";
import GuldsmedLogo from "../../assets/GuldsmedLogo.webp";
import ThunderpowerEvent from "../../assets/thunderpowerevent.jpg";
import Thunderpower from "../../assets/Thunderpower.png";
import MyselfieEvent from "../../assets/myselfieevent.webp";
import Myselfie from "../../assets/myselfie.avif";
import MetteStage from "../../assets/Mette-Stage.png";
import ole from "../../assets/ole.png";
import OlePerson from "../../assets/ole-person.png";
import KirkSuites from "../../assets/Kirksuites.avif";
import KirkLogo from "../../assets/KirkLogo.svg";
import BOLogo from "../../assets/BogO.png";
import BOButik from "../../assets/b-o8.jpg";
import ApolloCenter from "../../assets/ApolloCenter.jpg";
import ApolloLogo from "../../assets/ApolloLogo.png";
import DanskGalleri from "../../assets/DanskGalleriButik.webp";
import LinderothBiler from "../../assets/Linderoth-Biler.webp";
import LinderothLogo from "../../assets/Linderoth.png";
import VingstedCenter from "../../assets/VingstedCenter.jpg";
import VingstedLogo from "../../assets/VingstedLogo.svg";
import JesperIversen from "../../assets/JesperIversen.jpg";
import LocalLiving from "../../assets/LocalLivingItalien.png";
import LocalLivingLogo from "../../assets/localliving-logo.png";
import Blomster from "../../assets/Blomster.jpg";
import BlomsterFabrikken from "../../assets/BlomsterFabrikken.png";
import Enzo from "../../assets/Enzo.webp";
import EnzoLogo from "../../assets/EnzoLogo.png";
import Hedegaarden from "../../assets/Hedegaarden.jpg";
import HedegaardenLogo from "../../assets/HedegaardenLogo.png";
import Staal from "../../assets/staalservice_logo.png";
import Vinsmagning from "../../assets/Vinsmagning.jpg";
import Drinks from "../../assets/drinks.png";
import BottomPrick from "../../assets/BottomPrick.png";

const cardsData = [
  {
    id: 1,
    image: Loungestol,
    headline: "Loungestol",
    text: "Lækker loungestol fra Natures Collection.",
    bottomImage: Natures,
    price: "Værdi: 19.000 kr.",
  },
  {
    id: 2,
    image: Jelling,
    headline: "2x Partoutbillet",
    text: "2 partoutbilletter til Jelling Musikfestival.",
    bottomImage: Jellingtekst,
    price: "Værdi: 6.500 kr.",
  },
  {
    id: 3,
    image: EventPark,
    headline: "ATV Safari",
    text: "ATV Safari for 10 personer (Kan bruges søndag-torsdag).",
    bottomImage: EventPark,
    price: "Værdi: 6.500 kr.",
  },
  {
    id: 4,
    image: Spa,
    headline: "Gavekort",
    text: "Gavekort til spaophold med middag.",
    bottomImage: HotelVejleFjord,
    price: "Værdi: 5.000 kr.",
  },
  {
    id: 5,
    image: Kolagen,
    headline: "Kollagen+/pure",
    text: "Et årsforbrug af Kollagen+/pure fra nutrinic.",
    bottomImage: Nutrinic,
    price: "Værdi: 3.588 kr.",
  },
  {
    id: 6,
    image: EventPark,
    headline: "Klippekort",
    text: "10 klip til fodboldgolf/disc golf.",
    bottomImage: EventPark,
    price: "Værdi: 1.250 kr.",
  },
  {
    id: 7,
    image: Munkebjerg,
    headline: "Gavekort",
    text: "Gavekort til ophold på Hotel Munkebjerg.",
    bottomImage: Munkebjerg,
    price: "Værdi: 5.593 kr.",
  },
  {
    id: 8,
    image: Fisk,
    headline: "Frisk Fisk",
    text: "Vælg mellem et bredt udvalg af frisk fisk og skaldyr, afstemt efter sæsonen.",
    bottomImage: Fiskehus,
    price: "Værdi: 600 kr.",
  },
  {
    id: 9,
    image: Olie,
    headline: "Olie & Keramik",
    text: "Koldpresset Økologisk Ekstra jomfruolivenolie fra Toscana & 2 smukke keramikskåle.",
    bottomImage: OlieLogo,
    price: "Værdi: 600 kr.",
  },
  {
    id: 10,
    image: Olie,
    headline: "Olie & Keramik",
    text: "Koldpresset Økologisk Ekstra jomfruolivenolie fra Toscana & 2 smukke keramikskåle.",
    bottomImage: OlieLogo,
    price: "Værdi: 600 kr.",
  },
  {
    id: 11,
    image: Yoga,
    headline: "Yoga Event",
    text: "Yogaevent for 14 personer. 1 1/2 times yogaevent efterfulgt af frugt og tehygge.",
    bottomImage: Yogilates,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 12,
    image: Ferie,
    headline: "Gavekort",
    text: "Gavekort til ferieophold i Frankrig.",
    bottomImage: Provacances,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 13,
    image: Mad,
    headline: "Gavekort",
    text: "Gavekort til middag hos MadIndustrien.",
    bottomImage: Madindustrien,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 14,
    image: GuldsmedButik,
    headline: "Gavekort",
    text: "Gavekort til Guldsmed Gram i Vejle midtby.",
    bottomImage: GuldsmedLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 15,
    image: ThunderpowerEvent,
    headline: "DJ til Event",
    text: "Få en DJ fra Thunderpower ud til din fest!.",
    bottomImage: Thunderpower,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 16,
    image: MyselfieEvent,
    headline: "Selfie Stand",
    text: "Selfie Stand til din næste fest!.",
    bottomImage: Myselfie,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 17,
    image: MetteStage,
    headline: "Foredrag",
    text: "Billetter til Foredrag med forsvarsadvokaten Mette Grith Stage.",
    bottomImage: BottomPrick,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 18,
    image: OlePerson,
    headline: "Maleri",
    text: "Maleri malet af Ole Aakjær",
    bottomImage: ole,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 19,
    image: KirkSuites,
    headline: "Ophold",
    text: "Ophold på Kirk Suites, Vejle.",
    bottomImage: KirkLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 20,
    image: BOButik,
    headline: "Gavekort",
    text: "Gavekort til B&O Vejle.",
    bottomImage: BOLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 21,
    image: ApolloCenter,
    headline: "Gavekort",
    text: "Gavekort til Apollo Fitness Vejle.",
    bottomImage: ApolloLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 22,
    image: DanskGalleri,
    headline: "Musseums tur",
    text: "Tur til Dansk Kunstgalleri Vejle.",
    bottomImage: BottomPrick,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 23,
    image: LinderothBiler,
    headline: "Bilklargøring",
    text: "Få din bil klargjort hos Linderoth Biler Vejle.",
    bottomImage: LinderothLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 24,
    image: Drinks,
    headline: "Drinks",
    text: "Cocktailkursus",
    bottomImage: BottomPrick,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 25,
    image: VingstedCenter,
    headline: "Event",
    text: "Kom til Event ved Vingstedcenteret Vejle.",
    bottomImage: VingstedLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 26,
    image: JesperIversen,
    headline: "Musik til festen",
    text: "Få Jesper Iversen ud og spil til din fest!.",
    bottomImage: BottomPrick,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 27,
    image: LocalLiving,
    headline: "Gavekort",
    text: "Gavekort til LocalLiving.",
    bottomImage: LocalLivingLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 28,
    image: Blomster,
    headline: "Blomster",
    text: "Blomster fra Blomster Fabrikken",
    bottomImage: BlomsterFabrikken,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 29,
    image: Enzo,
    headline: "Middag på Enzo",
    text: "Middag for 2 på Enzo, Lokal Italiensk Resturante",
    bottomImage: EnzoLogo,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 30,
    image: Vinsmagning,
    headline: "Vinsmagning",
    text: "Vinsmagning af StaalService A/S",
    bottomImage: Staal,
    price: "Værdi: Kommer snart.",
  },
  {
    id: 31,
    image: Hedegaarden,
    headline: "Ophold",
    text: "Ophold på Hotel Hedegaarden",
    bottomImage: HedegaardenLogo,
    price: "Værdi: Kommer snart.",
  },
];

export default cardsData;
