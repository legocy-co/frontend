import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from "../pages/SignInPage";
import RootPage from '../pages/RootPage';

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/auth/" element={<AuthPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/" element={<RootPage />} />
      </Routes>
  )
}

export default AppRouter;