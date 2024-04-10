import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useGate } from 'effector-react';


const AddMarketItemPage = () => {
  // const [tab, setTab] = useState('details');

  const navigateFn = useNavigate();

  useGate(model.gate, { navigateFn });
  // const detailsForm = useForm(mif.form);
  // const uploadImageForm = useForm(umiif.form);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/*<PageHeading to={'/profile'}>Add market item</PageHeading>*/}
      {/*<div className="w-full flex items-center justify-center gap-5 mb-7">*/}
      {/*  <MenuButton*/}
      {/*    isInvalid={!detailsForm.isValid}*/}
      {/*    disabled={!tab}*/}
      {/*    onClick={() => setTab(false)}*/}
      {/*  >*/}
      {/*    Info*/}
      {/*  </MenuButton>*/}
      {/*  <MenuButton*/}
      {/*    isInvalid={!uploadImageForm.isValid}*/}
      {/*    disabled={tab}*/}
      {/*    onClick={() => setTab(true)}*/}
      {/*  >*/}
      {/*    Images*/}
      {/*  </MenuButton>*/}
      {/*</div>*/}
      {/*<div className={tab ? 'hidden' : ''}>*/}
      {/*  <MarketItemInfoForm />*/}
      {/*</div>*/}
      {/*<div className={!tab ? 'hidden' : ''}>*/}
      {/*  <MarketItemImagesForm />*/}
      {/*</div>*/}
      {/*<Button className="mt-20" onClick={() => model.submitTriggered()}>*/}
      {/*  Add Market item*/}
      {/*</Button>*/}
    </div>
  );
};

export default AddMarketItemPage;
