import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../api";
import Item from "./Item";
import React from "react";
import "./Items.scss"

export default function ItemsGrid() {
  const itemsQuery = useQuery<Record<string, any>>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (itemsQuery.isPending) {
    return null;
  }

  return (
    <div className="items-grid">
      {itemsQuery.data?.map((item: Record<string, any>) => {
        return (
          <React.Fragment key={item.uuid}>
            <Item item={item} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
