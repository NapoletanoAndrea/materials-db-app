import CategoriesFilter from "../materials/filters/CategoriesFilter";
import ItemsGrid from "../materials/items/ItemsGrid";
import "./ItemsDashboard.scss";

export function ItemsDashboard() {
  return (
    <>
      <div className="container">
        <div className="items-dashboard">
          <div className="filters">
            <CategoriesFilter />
          </div>
          <ItemsGrid />
        </div>
      </div>
    </>
  );
}
