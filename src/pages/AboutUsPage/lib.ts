import LyubaVozzhova from '../../assets/pics/lyuba-vozzhova.png';
import TikhonKozlov from '../../assets/pics/tikhon-kozlov.png';
import ArtemyErkov from '../../assets/pics/artemy-erkov.png';
import LegoPagoda from '../../assets/pics/lego-pagoda.png';
import LegoLiberty from '../../assets/pics/lego-liberty.png';
import LegoGlobe from '../../assets/pics/lego-globe.png';
import LegoNotreDame from '../../assets/pics/lego-notre-dame.png';
import LegoPyramid from '../../assets/pics/lego-pyramid.png';

export type Teammate = { name: string; picture: string };

export const team: Teammate[] = [
  { name: 'Lyuba Vozzhova', picture: LyubaVozzhova },
  { name: 'Tikhon Kozlov', picture: TikhonKozlov },
  { name: 'Artemy Erkov', picture: ArtemyErkov },
];

export const spotPics: string[] = [
  LegoPagoda,
  LegoLiberty,
  LegoGlobe,
  LegoNotreDame,
  LegoPyramid,
];
