import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import { Suspense } from "react";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <Suspense fallback={<FetchingProductsPage />}>
      <SignupForm />
    </Suspense>
  );
};

export default SignupPage;
