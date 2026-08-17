"use client";

import AdventureExpeditionDetailsPage from "@/components/common/AdventureExpeditionDetailsPage";
import { useFetchExpeditionDetails } from "@/hooks/expedition/useFetchExpeditionsDetails";
import { useParams } from "next/navigation";

const ExpeditionsDetailsPage = () => {
  const { expeditionId } = useParams<{ expeditionId: string }>();

  const { data } = useFetchExpeditionDetails(expeditionId);

  return (
    <div>
      <AdventureExpeditionDetailsPage
        isAdmin={false}
        isAdventure={false}
        id={data?.data?.adventureId}
        expedition={data?.data}
      />
    </div>
  );
};

export default ExpeditionsDetailsPage;
