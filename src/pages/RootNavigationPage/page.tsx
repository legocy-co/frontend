import CollectionsIcon from '../../assets/icons/collection.svg?react';
import MarketplaceIcon from '../../assets/icons/catalog.svg?react';
import WikiIcon from '../../assets/icons/wiki.svg?react';
import { SelectSection } from '../../entities/select-section';

export const RootNavigationPage = () => {
  return (
    <div className="min-w-96 w-[94%] p-20 bg-root-navigation bg-center bg-no-repeat bg-cover bg-step rounded-[22px] flex flex-col justify-between items-center gap-6">
      <p className="font-bold text-[2.5rem] text-condition text-center">
        Welcome to Legocy
      </p>
      <p className="text-2xl max-w-[1008px] text-white text-center">
        Explore, collect, and trade your favorite LEGO sets on Legocy, the
        premier platform for LEGO enthusiasts worldwide.
      </p>
      <div className="flex justify-center flex-wrap gap-4 mt-6 text-center">
        <SelectSection
          to="/collection"
          label="Collections"
          description="Build your own collection by adding sets and easily track their
            prices over time."
          descriptionWidth={279}
          icon={<CollectionsIcon className="w-[52px] h-[38px]" />}
          white
        />
        <SelectSection
          to="/catalog/select"
          label="Marketplace"
          description="Discover, buy, and sell LEGO sets of any condition and series."
          descriptionWidth={298}
          icon={<MarketplaceIcon className="w-[38px] h-9" />}
          white
        />
        <SelectSection
          to="/wiki"
          label="Wikipedia"
          description="Explore a vast array of Lego sets, all neatly organized in one
            convenient table."
          descriptionWidth={270}
          icon={<WikiIcon className="w-10 h-9" />}
          white
        />
      </div>
    </div>
  );
};
