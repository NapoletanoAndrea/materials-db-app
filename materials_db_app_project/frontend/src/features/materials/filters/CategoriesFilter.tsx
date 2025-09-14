import { FilterIcon } from "lucide-react";
import Box1 from "../../../components/box1/Box1";

export default function CategoriesFilter() {
  return (
    <>
      <Box1>
        <div className="categories-filter">
          <div className="flex gap-2">
            <FilterIcon />
            <span className="font-semibold">Categories</span>
          </div>
        </div>
      </Box1>
    </>
  );
}
