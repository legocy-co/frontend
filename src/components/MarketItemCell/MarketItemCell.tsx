import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';

interface CatalogCellProps {
  id: number;
  condition: string;
  images: string[];
  location: string;
  price: number;
  series: string;
  set: string;
  set_number: number;
}

const MarketItemCell = (props: CatalogCellProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="catalog-cell"
      onClick={() => navigate(`/catalog/${props.id}`)}
    >
      <p>{props.location}</p>
      {props.images.map((image) => (
        <img
          key={image}
          src={'https://' + image}
          onError={addDefaultSrc}
          alt=""
        ></img>
      ))}
      {props.set}&nbsp; price: {props.price}
      <p>series: {props.series}</p>
      <p>set number: {props.set_number}</p>
    </div>
  );
};

export default MarketItemCell;
