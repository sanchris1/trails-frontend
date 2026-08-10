import ExpeditionDetailsPage from "../../components/ExpeditionDetailsPage";

const ExpeditionDetails = async ({
  params,
}: {
  params: Promise<{ expeditionId: string }>;
}) => {
  const { expeditionId } = await params;

  return (
    <div>
      <ExpeditionDetailsPage expeditionId={expeditionId} />
    </div>
  );
};

export default ExpeditionDetails;
