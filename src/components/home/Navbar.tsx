import { getSession } from "@/hooks/getSession";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const session = await getSession();

  console.log(session);

  return (
    <div>
      <NavbarClient />
    </div>
  );
};

export default Navbar;
