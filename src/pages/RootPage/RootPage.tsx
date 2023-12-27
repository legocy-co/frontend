import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RootPage = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Logo />
        <h1>Web Service for LEGO Lovers and Sellers.</h1>
        <p>Logo routes to the Private Page</p>
      </div>
      <Footer />
    </>
  );
};

export default RootPage;
