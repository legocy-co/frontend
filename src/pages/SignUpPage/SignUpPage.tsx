import './SignUpPage.scss'
import { useState, SyntheticEvent } from "react";
import Header from "../../components/Header";
import PasswordInput from "../../components/PasswordInput";
import Footer from "../../components/Footer";
import Input from "../../components/Input";

const SignUpPage = () => {
  const [showMessage, setShowMessage] = useState("");

  const [formData, setFormData] = useState(
      {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }
  );

  function handleSubmit(e: SyntheticEvent) {
    const
        password = document.getElementById('password') as HTMLInputElement,
        passwordConfirm = document.getElementById('passwordConfirm') as HTMLInputElement;

    password.style.background = 'white';
    passwordConfirm.style.background = 'white';

    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      password.style.background = '#FFD0D0';
      passwordConfirm.style.background = '#FFD0D0';

      setShowMessage('Passwords do not match');
    } else {
      // sendData(formData);
      console.log(formData);
      setShowMessage('');
    }
  }

  function handleChange(e: SyntheticEvent) {
    const eventTarget = e.target as HTMLInputElement;

    setFormData(prevData => {
      return {
        ...prevData,
        [eventTarget.name]: eventTarget.value,
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