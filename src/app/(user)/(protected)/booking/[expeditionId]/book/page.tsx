import BookingPage from "../../components/Booking";

const ExpeditionBookingPage = async ({
  params,
}: {
  params: Promise<{ expeditionId: string }>;
}) => {
  const { expeditionId } = await params;

  return (
    <div>
      <BookingPage />
    </div>
  );
};

export default ExpeditionBookingPage;
