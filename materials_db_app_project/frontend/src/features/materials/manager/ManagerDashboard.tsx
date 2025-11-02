import Container from "../../layout/Container";
import ManagerBanner from "./components/ManagerBanner";
import MaterialsInventory from "./components/MaterialsInventory";
import UploadMaterialsBox from "./components/UploadMaterialsBox";

export default function ManagerDashboard() {
  return (
    <>
      <ManagerBanner />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UploadMaterialsBox />
          </div>
          <div className="lg:col-span-2">
            <MaterialsInventory />
          </div>
        </div>
      </Container>
    </>
  );
}
