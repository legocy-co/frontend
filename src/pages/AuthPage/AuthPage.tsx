import './AuthPage.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import AuthWelcome from "../../components/AuthWelcome";

const AuthPage = () => {
  return (
      <>
        <Header />
        <AuthWelcome />
        <Footer />
      </>
  );
}

export default AuthPage;