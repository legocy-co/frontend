import './PasswordInput.scss'
import { SyntheticEvent } from 'react';
import Input from "../Input";

interface SignUpPasswordProps {
  label: string,
  inputID: string,
  toggleID: string,
  type: string,
  name: string,
  value: string,
  onChange: (e: SyntheticEvent<Element, Event>) => void;
}

const PasswordInput = (props: SignUpPasswordProps) => {
  function ShowPassword(inputID: string, toggleID: string) {
    const
        input = document.getElementById(inputID) as HTMLInputElement,
        toggle = document.getElementById(toggleID) as HTMLImageElement;

    if (input.type === 'password') {
      input.type = 'text';
      toggle.src = '/src/assets/icons/hide.svg';
    } else {
      input.type = 'password';
      toggle.src = '/src/assets/icons/show.svg';
    }
  }

  return (
      <div className="password-input">
        <Input
            label={props.label}
            id={props.inputID}
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
        />
        <img
            id={props.toggleID}
            src="/src/assets/icons/show.svg"
            alt=""
            onClick={() => ShowPassword(props.inputID, props.toggleID)}
        />
      </div>
  );
}

export default PasswordInput;