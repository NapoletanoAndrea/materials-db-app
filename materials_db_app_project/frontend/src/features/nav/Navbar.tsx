import { Link } from "react-router-dom";
import "./Navbar.scss";
import { APP_NAME } from "../../constants";
import { LogInIcon, BarChart3, FileText } from "lucide-react";

export function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link to="/">
              <span className="nav-text">{APP_NAME}</span>
            </Link>
            <div className="flex gap-8">
              <Link to="/" className="nav-btn">
                <span>Search</span>
              </Link>
              <Link to="/data" className="nav-btn">
                <BarChart3 />
                <span>Data</span>
              </Link>
              <Link to="/credits" className="nav-btn">
                <FileText />
                <span>Credits & Contacts</span>
              </Link>
            </div>
            <Link to="/login" className="login-btn">
              <LogInIcon className="login-icon" />
              <span className="">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
