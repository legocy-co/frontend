import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SignIn } from "../../features/sign-in/ui.tsx";

const SignInPage = () => {
  return (
    <div className="w-full h-full py-32 flex flex-col items-center">
      <Header />
      <div className="w-[1213px] h-[544px] bg-cover bg-center bg-no-repeat bg-sign-in bg-amber-300 rounded-2xl flex flex-col justify-center items-center text-white">
        <h1 className="font-bold text-bh mb-5">Sign In</h1>
        <p className="text-xl text-center w-80 mb-8">
          Welcome back! To access your account, please sign in
        </p>
        <SignIn />
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
