import { Grid, Orbit, Search } from "lucide-react";
import CategoriesFilter from "../materials/filters/CategoriesFilter";
import ItemsGrid from "../materials/items/ItemsGrid";
import { useEffect, useState, type ReactNode } from "react";
import ItemModal from "../materials/items/ItemModal";

const ViewButton = ({
  label = "",
  selected = false,
  children,
  onClick = () => {},
}: {
  label: string;
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 gap-2 flex items-center rounded-xl transition-colors
        ${
          selected
            ? "bg-brand text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-black"
        }`}
    >
      {children}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export function ItemsDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "explore">("grid");
  const [selectedItem, setSelectedItem] = useState<any>("");
  const [itemsFilter, setItemsFilter] = useState<string>("");

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2
       lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div className="xl:col-span-1 space-y-6">
          <CategoriesFilter />
        </div>
        <div className="lg:col-span-2 xl:col-span-3">
          <div
            id="search"
            className="rounded-lg border border-in border-gray-200
             shadow-sm mb-6 animate-fade-in has-focus-within:ring-2
             has-focus-within:ring-brand"
          >
            <div className="p-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Search />
                  <input
                    placeholder="Search materials by name, description, or category..."
                    className="grow"
                    value={itemsFilter}
                    onChange={(e: any) => {
                      setItemsFilter(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 space-y-4">
            <div className="flex justify-center">
              <div
                className="flex items-center gap-2 rounded-xl
               border border-gray-100
               p-1 shadow-sm"
              >
                <ViewButton
                  label="Grid View"
                  selected={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid width={16} />
                </ViewButton>
                {/* <ViewButton
                  label="Explore"
                  selected={viewMode === "explore"}
                  onClick={() => setViewMode("explore")}
                >
                  <Orbit width={16} />
                </ViewButton> */}
              </div>
            </div>
          </div>
          {viewMode === "grid" ? (
            <ItemsGrid
              itemsFilter={itemsFilter}
              onSelect={(item) => setSelectedItem(item)}
            />
          ) : null}
        </div>
      </div>
      <ItemModal
        isOpen={selectedItem}
        onClose={() => {
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </>
  );
}
