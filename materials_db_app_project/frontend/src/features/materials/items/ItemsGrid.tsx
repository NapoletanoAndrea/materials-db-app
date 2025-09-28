import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../api";
import Item from "./Item";
import React from "react";

export default function ItemsGrid({
  onSelect = () => {},
}: {
  onSelect: (item: any) => void;
}) {
  const itemsQuery = useQuery<Record<string, any>>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (itemsQuery.isPending) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
     xl:grid-cols-4 gap-6"
    >
      {itemsQuery.data?.map((item: Record<string, any>) => {
        return (
          <React.Fragment key={item.uuid}>
            <Item item={item} onClick={() => onSelect(item)} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
