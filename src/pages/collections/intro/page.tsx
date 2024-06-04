import { Button } from '../../../shared/ui/button.tsx';
import { useNavigate } from 'react-router-dom';

export const CollectionsIntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[92%] h-[510px] p-12 bg-cover bg-center bg-no-repeat bg-collections-intro bg-amber-300 rounded-[22px] flex flex-col gap-6 justify-center items-center text-white">
      <h1 className="font-bold text-bh">Collections</h1>
      <p className="text-lg text-center text-wrap">
        Welcome to Lego Collections! Start building your own personal collection
        by adding sets and easily track their prices over time.
      </p>
      <Button
        className="!w-80 !h-[53px] rounded-xl"
        onClick={() => navigate('/collection/add/')}
      >
        Start Collecting
      </Button>
    </div>
  );
};
