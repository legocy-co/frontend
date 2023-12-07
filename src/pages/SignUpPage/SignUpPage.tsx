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
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setShowMessage("Passwords do not match");
    } else {
      // sendData(formData);
      console.log(formData);
      setShowMessage("");
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

  function ShowPassword(id: string) {
    const inputField = document.getElementById(id) as HTMLInputElement;
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
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
                  src="/src/assets/icons/show-hide-password.svg"
                  alt=""
                  onClick={() => ShowPassword("password")}
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
                  src="/src/assets/icons/show-hide-password.svg"
                  alt=""
                  onClick={() => ShowPassword("passwordConfirm")}
              />
            </div>
          </div>
          <div className="signup--button">
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