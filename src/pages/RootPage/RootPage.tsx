import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
      <div id="portal_root" />
    </>
  );
};

export default RootPage;

// <div className="w-full h-full flex flex-col justify-center items-center">
//   <Logo />
//   <h1>Web Service for LEGO Lovers and Sellers.</h1>
//   <p>Logo routes to the Private Page</p>
// </div>
