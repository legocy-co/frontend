import LyubaVozzhova from '../../assets/pics/lyuba-vozzhova.png';
import TikhonKozlov from '../../assets/pics/tikhon-kozlov.png';
import ArtemyErkov from '../../assets/pics/artemy-erkov.png';

export type Teammate = { name: string; picture: string };

export const team: Teammate[] = [
  { name: 'Lyuba Vozzhova', picture: LyubaVozzhova },
  { name: 'Tikhon Kozlov', picture: TikhonKozlov },
  { name: 'Artemy Erkov', picture: ArtemyErkov },
];
