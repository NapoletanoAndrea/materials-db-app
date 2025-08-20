import { Link } from "react-router-dom";
import "./Navbar.scss";
import { APP_NAME } from "../../constants";

export function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="container">
          <Link to="/">
            <span className="nav-text">{APP_NAME}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
