import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";
import { LogInIcon, BarChart3, FileText, Plus } from "lucide-react";
import type { ReactNode } from "react";
import Container from "../layout/Container";

const NavLink = ({
  to = "",
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="flex gap-2 font-medium hover:text-brand transition-colors duration-100"
    >
      {children}
    </Link>
  );
};

const NavLink2 = ({
  to = "",
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="bg-black text-white px-5 py-3
              rounded flex gap-4 items-center hover:bg-neutral-500"
    >
      {children}
    </Link>
  );
};

export function Navbar() {
  return (
    <>
      <div className="py-4 w-full bg-brand-light border-b border-gray-200">
        <Container>
          <div className="flex justify-between items-center">
            <Link to="/">
              <span className="font-bold text-2xl">{APP_NAME}</span>
            </Link>
            <div className="flex gap-8">
              <NavLink to="/">Search</NavLink>
              <NavLink to="/data">
                <BarChart3 />
                Data
              </NavLink>
              <NavLink to="/credits">
                <FileText />
                <span>Credits & Contacts</span>
              </NavLink>
            </div>
            <NavLink2 to="/login">
              <Plus className="w-4 h-4"/>
              Add Item
            </NavLink2>
          </div>
        </Container>
      </div>
    </>
  );
}
