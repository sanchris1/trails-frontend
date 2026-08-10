import React from "react";
import EditExpeditionPage from "../../components/EditExpeditionPage";

const EditExpedition = async ({
  params,
}: {
  params: Promise<{ expeditionId: string }>;
}) => {
  const { expeditionId } = await params;

  return (
    <div>
      <EditExpeditionPage expeditionId={expeditionId} />
    </div>
  );
};

export default EditExpedition;
