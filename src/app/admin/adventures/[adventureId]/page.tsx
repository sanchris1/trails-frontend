import AdventureExpeditionDetailsPage from "@/components/common/AdventureExpeditionDetailsPage";

const AdventureDetailsPage = async ({
  params,
}: {
  params: Promise<{ adventureId: string }>;
}) => {
  const { adventureId } = await params;

  return (
    <div>
      <AdventureExpeditionDetailsPage id={adventureId} isAdmin isAdventure />
    </div>
  );
};

export default AdventureDetailsPage;
