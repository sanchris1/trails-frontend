"use client";

import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import MerchandiseDetails from "@/components/common/MerchandiseDetailsComponents";
import { useGetMerchandiseDetails } from "@/hooks/merchandise/getMerchandiseDetails";
import { useParams } from "next/navigation";

const AdminMerchandiseDetailsPage = () => {
  const { merchandiseSlug } = useParams<{ merchandiseSlug: string }>();

  console.log(merchandiseSlug);

  const { data, isLoading } = useGetMerchandiseDetails({ merchandiseSlug });

  console.log(data);

  if (isLoading) return <FetchingProductsPage />;

  return (
    <div>
      <MerchandiseDetails product={data} isAdmin />
    </div>
  );
};

export default AdminMerchandiseDetailsPage;
