import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SignUp } from '../../features/sign-up/ui.tsx';

const SignUpPage = () => {
  return (
    <>
      <Header />
      <div className="w-[1208px] h-[634px] bg-sign-up rounded-3xl flex flex-col justify-center items-center text-white">
        <p className="font-bold text-bh mb-8">Sign Up</p>
        <SignUp />
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
