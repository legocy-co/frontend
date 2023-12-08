import './SignUpPage.scss'
import { useState, SyntheticEvent } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SignUpPassword from "../../components/SignUpPassword";

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
            <SignUpPassword
                inputID="password"
                name="password"
                toggleID="showPassword"
                value={formData.password}
                handleChange={handleChange}
            />
            <label htmlFor="passwordConfirm">Confirm password</label>
            <SignUpPassword
                inputID="passwordConfirm"
                name="passwordConfirm"
                toggleID="showPasswordConfirm"
                value={formData.passwordConfirm}
                handleChange={handleChange}
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