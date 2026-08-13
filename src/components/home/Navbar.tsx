import { getSession } from "@/hooks/getSession";
import NavbarClient from "./NavbarClient";

export type Session = Awaited<ReturnType<typeof getSession>>;

const Navbar = async () => {
  const session = await getSession();

  return (
    <div>
      <NavbarClient session={session} />
    </div>
  );
};

export default Navbar;
