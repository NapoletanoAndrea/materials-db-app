import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../api";
import Item from "./Item";
import React, { useMemo } from "react";

export default function ItemsGrid({
  itemsFilter = "",
  onSelect = () => {},
}: {
  itemsFilter: string;
  onSelect: (item: any) => void;
}) {
  const itemsQuery = useQuery<Record<string, any>>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const filteredItems = useMemo(() => {
    if (!itemsQuery.data) return null;

    const items = itemsQuery.data.filter((item: any) => item.active);

    if (!itemsFilter) {
      return items;
    }

    return itemsQuery.data.filter((item: Record<string, any>) => {
      return (
        item.name.toLowerCase().includes(itemsFilter.toLowerCase()) ||
        item.description.toLowerCase().includes(itemsFilter.toLowerCase()) ||
        item.category_name?.toLowerCase().includes(itemsFilter.toLowerCase())
      );
    });
  }, [itemsQuery.data, itemsFilter]);

  if (itemsQuery.isPending) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
     xl:grid-cols-4 gap-6"
    >
      {filteredItems.map((item: Record<string, any>) => {
        return (
          <React.Fragment key={item.uuid}>
            <Item item={item} onClick={() => onSelect(item)} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
