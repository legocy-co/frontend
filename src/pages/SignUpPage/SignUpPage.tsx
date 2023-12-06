import './SignUpPage.scss'
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {SyntheticEvent} from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState(
      {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
  )

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    // sendData(formData)
    console.log(formData)
  }

  function handleChange(e: SyntheticEvent) {
    const {name, value} = e.target

    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  return (
    <>
      <Header />
      <div className="signup--banner">
        <p>Sign Up</p>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              onChange={handleChange}
              name="username"
              value={formData.username}
          />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;