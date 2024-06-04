import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/button.tsx';
import * as model from './model';

export const WikiIntroPage = () => {
  const navigate = useNavigate();

  function handleGo() {
    model.wikiVisited();
    navigate('/wiki/sets');
  }

  return (
    <div className="w-[92%] p-12 h-[510px] bg-cover bg-center bg-no-repeat bg-wiki-intro bg-amber-300 rounded-[22px] flex flex-col gap-6 justify-center items-center text-white">
      <h1 className="font-bold text-bh text-center">
        Welcome to our Lego Wikipedia
      </h1>
      <p className="text-lg max-w-[639px] text-center">
        Welcome to our Lego set Wikipedia! Explore a vast array of Lego sets,
        all neatly organized in one convenient table. Simply click on any set
        from the list to uncover detailed information. Happy exploring!
      </p>
      <Button
        className="!h-[53px] !w-80 sm:!w-[328px] rounded-xl"
        onClick={handleGo}
      >
        Go to Wikipedia
      </Button>
    </div>
  );
};
