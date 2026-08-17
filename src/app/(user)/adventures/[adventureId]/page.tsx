import AdventureExpeditionDetailsPage from "@/components/common/AdventureExpeditionDetailsPage";
import React from "react";

const AdventureDetailsPage = async ({
  params,
}: {
  params: Promise<{ adventureId: string }>;
}) => {
  const { adventureId } = await params;

  console.log(adventureId);

  return (
    <div>
      <AdventureExpeditionDetailsPage
        isAdventure
        isAdmin={false}
        id={adventureId}
      />
    </div>
  );
};

export default AdventureDetailsPage;
