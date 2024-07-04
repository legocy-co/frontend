import LyubaVozzhova from '../../assets/pics/lyuba-vozzhova.png';
import TikhonKozlov from '../../assets/pics/tikhon-kozlov.png';
import ArtemyErkov from '../../assets/pics/artemy-erkov.png';
import LegoPagoda from '../../assets/pics/lego-pagoda.png';
import LegoLiberty from '../../assets/pics/lego-liberty.png';
import LegoGlobe from '../../assets/pics/lego-globe.png';
import LegoNotreDame from '../../assets/pics/lego-notre-dame.png';
import LegoPyramid from '../../assets/pics/lego-pyramid.png';

export type Teammate = { name: string; picture: string };

export type Goal = { header: string; text: string };

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

export const goals: Goal[] = [
  {
    header: 'Foster Connections',
    text: "We aim to create a space where LEGO collectors can connect, share, and learn from each other. Whether you're a seasoned collector or just starting out, there's a place for you here.\n",
  },
  {
    header: 'Simplify Trading',
    text: "We strive to make buying and selling LEGO sets a breeze. Our peer-to-peer marketplace allows collectors to find the sets they're looking for and sell the ones they no longer need.\n",
  },
  {
    header: 'Empower Collectors',
    text: "We strive to make buying and selling LEGO sets a breeze. Our peer-to-peer marketplace allows collectors to find the sets they're looking for and sell the ones they no longer need.\n",
  },
];
