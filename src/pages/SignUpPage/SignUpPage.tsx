import './SignUpPage.scss'
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {SyntheticEvent} from "react";

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
      password.style.background = '#FFD0D0D1';
      passwordConfirm.style.background = '#FFD0D0D1';

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
    <>
      <Header />
      <div className="signup--banner">
        <p>Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                onChange={handleChange}
                name="username"
                value={formData.username}
            />
            <label htmlFor="email">E-mail address</label>
            <input
                type="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <label htmlFor="password">Password</label>
            <div className="signup--password">
              <input
                  id="password"
                  type="password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
              />
              <img
                  id="showPassword"
                  src="/src/assets/icons/show.svg"
                  alt=""
                  onClick={() => ShowPassword("password", "showPassword")}
              />
            </div>
            <label htmlFor="passwordConfirm">Confirm password</label>
            <div className="signup--password">
              <input
                  id="passwordConfirm"
                  type="password"
                  onChange={handleChange}
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
              />
              <img
                  id="showPasswordConfirm"
                  src="/src/assets/icons/show.svg"
                  alt=""
                  onClick={() => ShowPassword("passwordConfirm", "showPasswordConfirm")}
              />
            </div>
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