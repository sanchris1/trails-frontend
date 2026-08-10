"use client";

import { useFetchExpeditionDetails } from "@/hooks/expedition/useFetchExpeditionsDetails";
import ExpeditionForm from "./ExpeditionForm";

const EditExpeditionPage = ({ expeditionId }: { expeditionId: string }) => {
  const { data } = useFetchExpeditionDetails(expeditionId);

  return (
    <div>
      <ExpeditionForm
        adventureId={data?.data?.adventureId}
        expedition={data?.data}
        mode="edit"
      />
    </div>
  );
};

export default EditExpeditionPage;
