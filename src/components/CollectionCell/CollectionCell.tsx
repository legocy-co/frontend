import { useNavigate } from 'react-router-dom';
import './CollectionCell.scss';

interface CollectionCellProps {
  id: number;
  buy_price: number;
  valuation: number;
  series: string;
  set: string;
  set_number: number;
  set_id: number;
  condition: string;
}

const CollectionCell = (props: CollectionCellProps) => {
  const navigate = useNavigate();

  return (
    <div className="cell">
      <h1>Buy price: {props.buy_price} $</h1>
      <div className="cell--props">
        <h1>{props.set}</h1> {props.valuation && <h1>{props.valuation}$</h1>}
      </div>
      <div className="cell--props">
        <p>Series: {props.series}</p>
        <p>Condition: {props.condition}</p>
      </div>
      <p>
        <u onClick={() => navigate('/wiki/sets/' + props.set_id)}>
          Set number: {props.set_number}
        </u>
      </p>
      <div
        className="cell--link"
        onClick={() => navigate(`/catalog/${props.id}`)}
      >
        <h1>More Info</h1>
      </div>
    </div>
  );
};

export default CollectionCell;
