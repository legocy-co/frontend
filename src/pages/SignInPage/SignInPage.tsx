import './SignInPage.scss';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import Submit from "../../components/Submit";
import { handleSubmit, handleChange } from "../../features/forms.ts";

const SignInPage = () => {
  const [showMessage, setShowMessage] = useState('');

  const [formData, setFormData] = useState(
      {
        username: '',
        password: '',
      }
  );

  // function handleSubmit(e: SyntheticEvent) {
  //   const
  //       formKeys = Object.keys(formData),
  //       formValues = Object.values(formData),
  //       formLabels = document.getElementsByTagName('label');
  //
  //   e.preventDefault();
  //   colorInputs(formKeys, 'white');
  //
  //   for (let i = 0; i < formKeys.length; i++) {
  //     if (!formValues[i]) {
  //       colorInputs([formKeys[i]], '#FFD0D0');
  //       setShowMessage(`Missing ${formLabels[i].innerText}`);
  //       return;
  //     }
  //   }
  //
  //   // toAPI(formData); w/o passwordConfirm
  //   console.log(formData);
  //
  //   setShowMessage('');
  // }

  return (
    <>
      <Header />
      <div className="signin--banner">
        <h1>Sign In</h1>
        <p>Welcome back! To access your account, please sign in</p>
        <form onSubmit={(e) => handleSubmit(e, formData, setShowMessage)}>
          <Input
              label="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e, setFormData)}
          />
          <PasswordInput
              label="Password"
              inputID="password"
              toggleID="showPassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e, setFormData)}
          />
          <Submit showMessage={showMessage} buttonText="Sign In" />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignInPage;