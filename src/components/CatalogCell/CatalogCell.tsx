import './CatalogCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';

interface CatalogCellProps {
  condition: string;
  images: string[];
  location: string;
  price: number;
  series: string;
  set: string;
  set_number: number;
}

const CatalogCell = (props: CatalogCellProps) => {
  return (
    <div className="catalog-cell">
      <p>{props.location}</p>
      {props.images.map((image) => (
        <img src={image} onError={addDefaultSrc} alt=""></img>
      ))}
      {props.set}&nbsp; price: {props.price}
      <p>series: {props.series}</p>
      <p>set number: {props.set_number}</p>
    </div>
  );
};

export default CatalogCell;
