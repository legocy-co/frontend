import './SignUpPage.scss'
import { useState, SyntheticEvent } from "react";
import Header from "../../components/Header";
import PasswordInput from "../../components/PasswordInput";
import Footer from "../../components/Footer";
import Input from "../../components/Input";

const SignUpPage = () => {
  const [showMessage, setShowMessage] = useState('');

  const [formData, setFormData] = useState(
      {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }
  );

  function handleSubmit(e: SyntheticEvent) {
    const
        formKeys = Object.keys(formData),
        formValues = Object.values(formData),
        formLabels = document.getElementsByTagName('label');

    const colorInputs = (inputs: string[], color: string) => {
      for (let i = 0; i < inputs.length; i++) {
        const input = document.getElementById(inputs[i]) as HTMLInputElement;
        input.style.background = color;
      }
    }

    e.preventDefault();
    colorInputs(formKeys, 'white');

    for (let i = 0; i < formKeys.length; i++) {
      if (!formValues[i]) {
        colorInputs([formKeys[i]], '#FFD0D0');
        setShowMessage(`Missing ${formLabels[i].innerText}`);
        return;
      }
    }

    if (formData.password !== formData.passwordConfirm) {
      colorInputs(['password', 'passwordConfirm'], '#FFD0D0');
      setShowMessage('Passwords do not match');
      return;
    }

    // toAPI(formData);
    console.log(formData);

    setShowMessage('');
  }

  function handleChange(e: SyntheticEvent) {
    const formInput = e.target as HTMLInputElement;

    setFormData(prevData => {
      return {
        ...prevData,
        [formInput.name]: formInput.value,
      };
    })
  }

  return (
    <>
      <Header />
      <div className="signup--banner">
        <p>Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
                label="Username"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <Input
                label="E-mail address"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <PasswordInput
                label="Password"
                inputID="password"
                name="password"
                type="password"
                toggleID="showPassword"
                value={formData.password}
                onChange={handleChange}
            />
            <PasswordInput
                label="Confirm password"
                inputID="passwordConfirm"
                name="passwordConfirm"
                type="password"
                toggleID="showPasswordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
            />
          </div>
          <div className="signup--submit">
            {(showMessage && <div>{showMessage}</div>)}
            <button>Sign Up</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;