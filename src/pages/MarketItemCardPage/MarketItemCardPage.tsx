import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { addDefaultSrc } from '../../services/utils.ts';

const MarketItemCardPage = () => {
  const params = useParams<'id'>();

  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });

  const marketItem = useUnit(model.$marketItemCard);
  return (
    <div className="w-full h-full px-64 flex flex-col justify-center items-center">
      <Header />
      <div className="self-stretch mt-8 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              src={'https://' + marketItem.main_image}
              onError={addDefaultSrc}
              className="aspect-[1.27] object-contain object-center w-full fill-[url(<path-to-image>),lightgray_50%_/_cover_no-repeat,#C4C4C4] overflow-hidden grow max-md:max-w-full max-md:mt-8"
            />
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch mt-2 max-md:max-w-full max-md:mt-9">
              <div className="text-black text-3xl font-semibold max-md:max-w-full">
                {marketItem.set}
              </div>
              <div className="text-zinc-600 text-xl font-medium mt-12 max-md:max-w-full max-md:mt-10">
                Condition:{' '}
                <span className="text-zinc-600">{marketItem.condition}</span>
              </div>
              <div className="text-zinc-600 text-xl font-medium mt-5 max-md:max-w-full">
                Series:{' '}
                <span className="text-zinc-600">{marketItem.series}</span>
              </div>
              <div className="text-zinc-600 text-xl font-medium mt-4 max-md:max-w-full">
                Location:{' '}
                <span className="text-zinc-600">{marketItem.location}</span>
              </div>
              <div className="text-zinc-600 text-xl font-medium mt-6 max-md:max-w-full">
                Set number:{' '}
                <span className="text-zinc-600">{marketItem.set_number}</span>
              </div>
              <div className="text-black text-2xl font-medium border bg-stone-50 justify-center items-stretch mt-11 pl-6 pr-5 py-4 rounded-xl border-solid border-black max-md:max-w-full max-md:mt-10 max-md:pl-5">
                Set description: {marketItem.description}
              </div>
              <div className="flex items-center justify-between gap-5 mt-20 pr-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                <div className="text-black text-3xl font-medium my-auto">
                  {marketItem.price} $
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[594px] max-w-full mt-8 self-start">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          {marketItem.rest_images?.map((image) => (
            <div
              key={image}
              className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0"
            >
              <img
                src={'https://' + image}
                onError={addDefaultSrc}
                alt=""
                className="aspect-[1.13] object-contain object-center w-full overflow-hidden shrink-0 grow flex-1 max-md:mt-8"
              ></img>
            </div>
          ))}
        </div>
      </div>
      <div className="border self-stretch flex items-start justify-between gap-5 mt-9 pl-6 pr-11 py-6 rounded-xl border-solid border-black max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <div className="self-center flex basis-[0%] flex-col items-stretch my-auto">
          <div className="text-black text-2xl font-medium whitespace-nowrap">
            {marketItem.seller_username}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketItemCardPage;
