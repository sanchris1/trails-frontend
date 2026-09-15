"use client";

import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import MerchandiseDetails from "@/components/common/MerchandiseDetailsComponents";
import { useGetMerchandiseDetails } from "@/hooks/merchandise/getMerchandiseDetails";
import { useParams } from "next/navigation";

const MerchandiseDetailsPage = () => {
  const { merchandiseSlug } = useParams<{ merchandiseSlug: string }>();

  const { data, isLoading } = useGetMerchandiseDetails({ merchandiseSlug });

  if (isLoading) return <FetchingProductsPage />;

  return (
    <div>
      {" "}
      <MerchandiseDetails product={data} isAdmin={false} />{" "}
    </div>
  );
};

export default MerchandiseDetailsPage;
