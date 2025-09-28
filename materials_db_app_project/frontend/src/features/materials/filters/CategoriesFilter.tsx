import { FilterIcon } from "lucide-react";
import Box1 from "../../../components/box1/Box1";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api";
import { useState, type ButtonHTMLAttributes } from "react";

type CategoryFilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  selected: boolean;
};

const CategoryFilterButton = ({
  label = "",
  selected = false,
  ...props
}: CategoryFilterButtonProps) => {
  return (
    <button
      {...props}
      className={`
        text-sm font-bold px-3 py-1 rounded-2xl transition-colors
        ${
          selected
            ? "bg-brand text-white"
            : "bg-gray-100 hover:bg-brand hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
};

export default function CategoriesFilter() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  if (categoriesQuery.isPending) return null;

  return (
    <>
      <Box1>
        <div id="categories-filter" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FilterIcon className="p-2 w-9 h-9 bg-red-100 text-brand rounded-sm" />
            <span className="font-semibold">Categories</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <CategoryFilterButton
              label="All"
              selected={!selectedFilter}
              onClick={() => {
                setSelectedFilter("");
              }}
            />
            {categoriesQuery.data.map((category: any) => {
              const catId = category.id;
              return (
                <CategoryFilterButton
                  key={catId}
                  label={category.name}
                  selected={selectedFilter === catId}
                  onClick={() => {
                    setSelectedFilter(catId);
                  }}
                />
              );
            })}
          </div>
        </div>
      </Box1>
    </>
  );
}
