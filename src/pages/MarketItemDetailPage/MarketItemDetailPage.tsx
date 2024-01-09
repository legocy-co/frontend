import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import { addDefaultSrc } from '../../services/utils.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import HeartIcon from '../../assets/icons/heart.svg';
import { Button } from '../../shared/ui/button.tsx';

const MarketItemDetailPage = () => {
  const marketItem = useUnit(model.$marketItemDetail);
  const params = useParams<'id'>();

  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });

  const subImages = marketItem.images.slice(1, 3).map((image) => (
    <div className="w-44 h-40" key={image}>
      <img
        src={'https://' + image}
        onError={addDefaultSrc}
        alt=""
        className="w-full h-full object-cover object-center rounded-md cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
      ></img>
    </div>
  ));

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading isMarketItemDetail to="/catalog" />
      <div className="mt-8 mb-9 whitespace-nowrap">
        <div className="inline-block w-[595px]">
          <div className="relative mb-7">
            <img
              className="w-full h-[470px] object-cover object-center rounded-md bg-silver cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
              src={'https://' + marketItem.images.slice(0, 1)}
              onError={addDefaultSrc}
              alt=""
            />
            <img
              className="absolute top-4 left-5 cursor-pointer transition-all hover:brightness-95 active:brightness-90"
              src={HeartIcon}
              alt=""
            />
          </div>
          <div className="flex justify-center w-full">{subImages}</div>
        </div>
        <div className="w-[577px] align-top inline-block ml-7 text-xl">
          <p className="text-3xl font-semibold mb-10">{marketItem.set}</p>
          <div className="flex flex-col justify-between h-24 mb-4">
            <p>
              Condition:{' '}
              <span className="text-light">{marketItem.condition}</span>
            </p>
            <p>
              Series: <span className="text-light">{marketItem.series}</span>
            </p>
            <p>
              Location:{' '}
              <span className="text-light">{marketItem.location}</span>
            </p>
          </div>
          <p className="mb-9">
            Set Number:{' '}
            <span className="text-light">{marketItem.set_number}</span>
          </p>
          <div className="bg-ghost border border-solid border-black rounded-xl whitespace-normal py-3.5 pr-5 pl-6 mb-28">
            <p>Set description: {marketItem.description}</p>
          </div>
          <div className="flex justify-between items-center text-3xl">
            <p>{marketItem.price} $</p>
            <Button>Message about set</Button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center border border-solid border-black rounded-xl pt-7 pr-11 pb-5 pl-6">
        <div className="h-16 aspect-square relative rounded-full bg-legocy">
          <img
            className="absolute h-full rounded-full"
            onError={addDefaultSrc}
            src={'https://' + marketItem.seller_image}
            alt=""
          />
        </div>
        <p className="text-2xl">{marketItem.seller_username}</p>
      </div>
    </div>
  );
};

export default MarketItemDetailPage;

// <div className="w-full h-full px-64 flex flex-col justify-center items-center">
//   <div className="self-stretch mt-8 max-md:max-w-full">
//     <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//       <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
//         <img
//           loading="lazy"
//           src={'https://' + marketItem.images.slice(0, 1)}
//           onError={addDefaultSrc}
//           className="aspect-[1.27] object-contain object-center w-full fill-[url(<path-to-image>),lightgray_50%_/_cover_no-repeat,#C4C4C4] overflow-hidden grow max-md:max-w-full max-md:mt-8"
//           alt=""
//         />
//       </div>
//       <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
//         <div className="flex grow flex-col items-stretch mt-2 max-md:max-w-full max-md:mt-9">
//           <div className="text-black text-3xl font-semibold max-md:max-w-full">
//             {marketItem.set}
//           </div>
//           <div className="text-zinc-600 text-xl font-medium mt-12 max-md:max-w-full max-md:mt-10">
//             Condition:{' '}
//             <span className="text-zinc-600">{marketItem.condition}</span>
//           </div>
//           <div className="text-zinc-600 text-xl font-medium mt-5 max-md:max-w-full">
//             Series:{' '}
//             <span className="text-zinc-600">{marketItem.series}</span>
//           </div>
//           <div className="text-zinc-600 text-xl font-medium mt-4 max-md:max-w-full">
//             Location:{' '}
//             <span className="text-zinc-600">{marketItem.location}</span>
//           </div>
//           <div className="text-zinc-600 text-xl font-medium mt-6 max-md:max-w-full">
//             Set number:{' '}
//             <span className="text-zinc-600">{marketItem.set_number}</span>
//           </div>
//           <div className="text-black text-2xl font-medium border bg-stone-50 justify-center items-stretch mt-11 pl-6 pr-5 py-4 rounded-xl border-solid border-black max-md:max-w-full max-md:mt-10 max-md:pl-5">
//             Set description: {marketItem.description}
//           </div>
//           <div className="flex items-center justify-between gap-5 mt-20 pr-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
//             <div className="text-black text-3xl font-medium my-auto">
//               {marketItem.price} $
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="w-[594px] max-w-full mt-8 self-start">
//     <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//       {marketItem.images.slice(1).map((image) => (
//         <div
//           key={image}
//           className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0"
//         >
//           <img
//             src={'https://' + image}
//             onError={addDefaultSrc}
//             alt=""
//             className="aspect-[1.13] object-contain object-center w-full overflow-hidden shrink-0 grow flex-1 max-md:mt-8"
//           ></img>
//         </div>
//       ))}
//     </div>
//   </div>
//   <div className="border self-stretch flex items-start justify-between gap-5 mt-9 pl-6 pr-11 py-6 rounded-xl border-solid border-black max-md:max-w-full max-md:flex-wrap max-md:px-5">
//     <div className="self-center flex basis-[0%] flex-col items-stretch my-auto">
//       <div className="text-black text-2xl font-medium whitespace-nowrap">
//         {marketItem.seller_username}
//       </div>
//     </div>
//   </div>
// </div>
