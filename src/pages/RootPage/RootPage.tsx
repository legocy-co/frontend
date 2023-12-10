import "./RootPage.scss";
import Logo from "../../components/Logo";

const RootPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo />
      <h1>Web Service for LEGO Lovers and Sellers.</h1>
      <p>Logo routes to the Authorization Page</p>
    </div>
  );
};

export default RootPage;
