import './AuthPage.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer'


const AuthPage = () => {
  return (
      <>
        <Header />
        <div className="banner">
          <img src="/src/assets/pics/signup.jpeg" alt=""/>
        </div>
        <Footer />
      </>
  );
}

export default AuthPage;