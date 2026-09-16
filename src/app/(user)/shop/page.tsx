"use client";

import ShopHeader from "./components/ShopHeader";
import ShopToolbar from "./components/ShopToolbar";
import ProductGrid from "./components/ProductsGrid";
import { useFetchAllMerchandise } from "@/hooks/merchandise/fetchMerchandise";
import { useState } from "react";

const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("");

  const { data: merchandise, isLoading } = useFetchAllMerchandise({
    search,
    category: activeCategory === "all" ? undefined : activeCategory,
    sort,
    page,
  });

  return (
    <div>
      <ShopHeader />

      <ShopToolbar
        sort={sort}
        setSort={setSort}
        merchandiseLength={merchandise?.length ?? 0}
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ProductGrid
        merchandise={merchandise!}
        loading={isLoading}
        setPage={setPage}
      />
    </div>
  );
};

export default ShopPage;
