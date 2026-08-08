import React from "react";
import { Spinner } from "../ui/spinner";

const FetchingProductsPage = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <Spinner className="size-12" />
      <span className="text-3xl font-semibold text-primary">Loading...</span>
    </div>
  );
};

export default FetchingProductsPage;
