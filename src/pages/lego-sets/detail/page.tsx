import { LegoSetInfoRoute } from '../../../features/lego-set/info';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MenuButton } from '../../../shared/ui/menu-button.tsx';
import { useState } from 'react';

export const LegoSetDetailPage = () => {
  const [valuationsTab, setValuationsTab] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to="/wiki/sets/" />
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton
          disabled={!valuationsTab}
          onClick={() => setValuationsTab(false)}
        >
          Info
        </MenuButton>
        <MenuButton
          disabled={valuationsTab}
          onClick={() => setValuationsTab(true)}
        >
          Valuations
        </MenuButton>
      </div>
      {valuationsTab ? null : <LegoSetInfoRoute />}
    </div>
  );
};
