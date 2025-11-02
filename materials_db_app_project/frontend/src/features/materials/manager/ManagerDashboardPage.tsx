import PageWrapper from "../../layout/PageWrapper";
import { Navbar } from "../../nav/Navbar";
import ManagerDashboard from "./ManagerDashboard";

export default function ManagerDashboardPage() {
  return (
    <PageWrapper>
      <Navbar isManaging={true} />
      <ManagerDashboard />
    </PageWrapper>
  );
}
