"use client";

import AdventureExpeditionDetailsPage from "@/components/common/AdventureExpeditionDetailsPage";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import NoProductsFound from "@/components/common/NoProductsFound";
import { useFetchExpeditionDetails } from "@/hooks/expedition/useFetchExpeditionsDetails";

const ExpeditionDetailsPage = ({ expeditionId }: { expeditionId: string }) => {
  const { data, isLoading } = useFetchExpeditionDetails(expeditionId);

  if (isLoading) return <FetchingProductsPage />;

  if (!data.data) return <NoProductsFound />;
  return (
    <div>
      <AdventureExpeditionDetailsPage
        id={data?.data.adventure?.id}
        isAdmin
        isAdventure={false}
        expedition={data?.data}
      />
    </div>
  );
};

export default ExpeditionDetailsPage;
