import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RootPage = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        Success, you are on a Private Page
      </div>
      <Footer />
    </>
  );
};

export default RootPage;
