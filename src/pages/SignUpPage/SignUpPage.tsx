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
    const eventTarget = (e.target as HTMLInputElement)
    console.log(formData)
    setFormData(prevData => {
      return {
        ...prevData,
        [eventTarget.name]: eventTarget.value,
      }
    })
  }

  return (
    <>
      <Header />
      <div className="signup--banner">
        <p>Sign Up</p>
        <form onSubmit={handleSubmit}>
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
          <input
              type="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
          />
          <input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
          />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;