import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

interface Props {
  destination?: string;
  children: React.ReactNode;
}

export default function ProtectedRoute(props: Props) {
  const [isAuthorized] = useAuth();

  if (isAuthorized === null) return null;

  return isAuthorized ? props.children : <Navigate to="/login" />;
}
