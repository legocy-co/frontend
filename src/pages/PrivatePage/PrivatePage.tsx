import { GetConfig } from '../../configs';
import { legoSetService } from '../../services/LegoSetService.ts';

const PrivatePage = () => {
  const config = GetConfig();
  config.legoSets ? console.log(config.legoSets) : legoSetService.GetLegoSets();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      Success, you are on a Private Page
    </div>
  );
};

export default PrivatePage;
