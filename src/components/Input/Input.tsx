import './Input.scss';
import {SyntheticEvent} from "react";

interface InputProps {
  label: string,
  id: string,
  type?: string,
  name: string,
  value: string,
  onChange: (e: SyntheticEvent<Element, Event>) => void;
}

const Input = (props: InputProps) => {
  return (
      <div className="input">
        <label htmlFor={props.name}>{props.label}</label>
        <input
            id={props.id}
            type={props.type}
            onChange={props.onChange}
            name={props.name}
            value={props.value}
        />
      </div>
  );
}

export default Input;