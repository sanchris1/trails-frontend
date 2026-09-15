"use client";

import ShopHeader from "./components/ShopHeader";
import ShopToolbar from "./components/ShopToolbar";
import ProductGrid from "./components/ProductsGrid";
import { useFetchAllMerchandise } from "@/hooks/merchandise/fetchMerchandise";

const ShopPage = () => {
  const { data: merchandise, isLoading } = useFetchAllMerchandise();

  return (
    <div>
      <ShopHeader />
      {!isLoading && (
        <ShopToolbar merchandiseLength={merchandise?.length ?? 0} />
      )}
      <ProductGrid merchandise={merchandise!} loading={isLoading} />
    </div>
  );
};

export default ShopPage;
