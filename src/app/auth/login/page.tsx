import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Suspense fallback={<FetchingProductsPage />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
