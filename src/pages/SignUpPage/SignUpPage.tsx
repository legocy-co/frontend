import "./SignUpPage.scss";
import { useState } from "react";
import Header from "../../components/Header";
import PasswordInput from "../../components/PasswordInput";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import { handleSubmit, handleChange } from "../../features/forms.ts";
import Submit from "../../components/Submit";

const SignUpPage = () => {
  const [showMessage, setShowMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <>
      <Header />
      <div className="signup--banner">
        <p>Sign Up</p>
        <form onSubmit={(e) => handleSubmit(e, formData, setShowMessage)}>
          <div>
            <Input
              label="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e, setFormData)}
            />
            <Input
              label="E-mail address"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, setFormData)}
            />
            <PasswordInput
              label="Password"
              inputID="password"
              name="password"
              type="password"
              toggleID="showPassword"
              value={formData.password}
              onChange={(e) => handleChange(e, setFormData)}
            />
            <PasswordInput
              label="Confirm password"
              inputID="passwordConfirm"
              name="passwordConfirm"
              type="password"
              toggleID="showPasswordConfirm"
              value={formData.passwordConfirm}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <Submit showMessage={showMessage} buttonText="Sign Up" />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
