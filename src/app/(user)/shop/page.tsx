import React from "react";
import ShopHeader from "./components/ShopHeader";
import ShopToolbar from "./components/ShopToolbar";
import ProductGrid from "./components/ProductsGrid";

const ShopPage = () => {
  return (
    <div>
      <ShopHeader />
      <ShopToolbar />
      <ProductGrid />
    </div>
  );
};

export default ShopPage;
