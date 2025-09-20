import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";
import { LogInIcon, BarChart3, FileText } from "lucide-react";
import type { ReactNode } from "react";
import Container from "../layout/Container";
// import "./Navbar.scss";

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
            <Link to="/login" className="login-btn">
              <LogInIcon className="login-icon" />
              Login
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
