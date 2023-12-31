import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MarketItemCardPage = () => {
  const params = useParams<'id'>();

  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });

  const marketItem = useUnit(model.$marketItemCard);
  console.log(marketItem);
  return (
    <>
      <Header />
      Market Item Card
      <Footer />
    </>
  );
};

export default MarketItemCardPage;
