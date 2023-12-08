import './AuthPage.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const AuthPage = () => {
  return (
      <>
        <Header />
        <div className="banner">
          <h1>Sign Up</h1>
          <h2>Welcome back! To access your account, please sign in</h2>
          <a href="/auth/sign-up"><button>Sign Up</button></a>
          <p>Already have an account? <a href="/auth/sign-in">Sign in here</a></p>
        </div>
        <Footer />
      </>
  );
}

export default AuthPage;