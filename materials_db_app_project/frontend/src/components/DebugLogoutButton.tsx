import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function DebugLogoutButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        localStorage.clear();
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
}
