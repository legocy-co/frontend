import { legoSetService } from '../../services/LegoSetService.ts';

const PrivatePage = () => {
  legoSetService.GetLegoSets().then((legoSets) => console.log(legoSets));

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      Success, you are on a Private Page
    </div>
  );
};

export default PrivatePage;
