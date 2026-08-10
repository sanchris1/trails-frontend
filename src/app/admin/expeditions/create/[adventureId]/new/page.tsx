import ExpeditionForm from "../../../components/ExpeditionForm";

const CreateNewExpeditionPage = async ({
  params,
}: {
  params: Promise<{ adventureId: string }>;
}) => {
  const { adventureId } = await params;

  return (
    <div className="">
      <ExpeditionForm adventureId={adventureId} />
    </div>
  );
};

export default CreateNewExpeditionPage;
