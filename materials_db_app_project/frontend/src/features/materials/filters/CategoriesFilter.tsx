import { FilterIcon } from "lucide-react";
import Box1 from "../../../components/box1/Box1";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api";

export default function CategoriesFilter() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (categoriesQuery.isPending) return null;

  return (
    <>
      <Box1>
        <div
          id="categories-filter"
          className="flex flex-col gap-4 max-w-[20rem]"
        >
          <div className="flex gap-2">
            <FilterIcon />
            <span className="font-semibold">Categories</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categoriesQuery.data.map((category: any) => (
              <>
                <button
                  className="text-sm font-bold px-2 py-1 rounded-2xl 
                  bg-gray-200
             hover:bg-brand hover:text-white"
                >
                  {category.name}
                </button>
              </>
            ))}
          </div>
        </div>
      </Box1>
    </>
  );
}
