const ExpeditionBookingPage = async ({
  params,
}: {
  params: Promise<{ expeditionId: string }>;
}) => {
  const { expeditionId } = await params;

  return <div>ExpeditionBookingPage</div>;
};

export default ExpeditionBookingPage;
