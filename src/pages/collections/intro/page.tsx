import { Button } from '../../../shared/ui/button.tsx';
import { useNavigate } from 'react-router-dom';

export const CollectionsIntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[1213px] h-[544px] bg-cover bg-center bg-no-repeat bg-collections-intro bg-amber-300 rounded-2xl flex flex-col justify-center items-center text-white">
      <h1 className="font-bold text-bh mb-5">Collections</h1>
      <p className="text-xl w-96 mb-8">
        Greetings, LEGO aficionado! Step into your very own LEGO-sets Collection
        – the heart of brick excitement. ✨
      </p>
      <Button
        className={'mt-0 mb-7 h-14 !w-60'}
        onClick={() => navigate('/collection/add/')}
      >
        Start Collecting
      </Button>
      <p className="text-xl w-96">
        These empty spaces are waiting to be adorned with the treasures of the
        LEGO world.
      </p>
    </div>
  );
};
