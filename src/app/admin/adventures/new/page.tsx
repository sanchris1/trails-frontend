import AdventureForm from "../components/AdventureForm";

const CreateNewAdventure = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between sticky top-0 left-0 right-0 bg-secondary/30 py-4 rounded-lg px-2 backdrop-blur-3xl">
        <div className="">
          <h3 className="text-2xl font-semibold text-accent ">
            Create Adventure
          </h3>
          <p className="text-sm font-medium text-foreground">
            Design memorable outdoor experiences for you travelers
          </p>
        </div>
      </div>
      <div className="max-w-4xl  w-full">
        <AdventureForm mode="new" />
      </div>
    </div>
  );
};

export default CreateNewAdventure;
