import './SignUpPassword.scss';
import { SyntheticEvent } from 'react';

interface SignUpPasswordProps {
  inputID: string,
  toggleID: string,
  name: string,
  value: string,
  handleChange: (e: SyntheticEvent<Element, Event>) => void;
}

const SignUpPassword = (props: SignUpPasswordProps) => {
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
      <div className="signup-password">
        <input
            id={props.inputID}
            type="password"
            onChange={props.handleChange}
            name={props.name}
            value={props.value}
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

export default SignUpPassword;