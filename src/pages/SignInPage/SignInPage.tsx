import './SignInPage.scss';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FormPassword from "../../components/FormPassword";

const SignInPage = () => {
  return (
    <>
      <Header />
      <div className="signin--banner">
        <h1>Sign In</h1>
        <p>Welcome back! To access your account, please sign in</p>
        <form action="">
          <input type="text" name="" id=""/>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignInPage;