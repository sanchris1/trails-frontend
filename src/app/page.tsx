import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HomePage = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="">hello, Sam Chris Mboya</h3>
          <p className="">
            Welcome to the overview of the <Logo /> for the time
          </p>
        </div>
        <Button>
          {" "}
          <Plus />
          New Expedition
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
