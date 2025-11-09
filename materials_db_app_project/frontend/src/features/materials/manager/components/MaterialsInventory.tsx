import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, EyeOff, Search, Trash2 } from "lucide-react";
import { deleteItem, fetchItems, patchItem } from "../../api";
import React, { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../../loading/LoadingSpinner";
import ManagerEditBox from "./ManagerEditBox";

export default function MaterialsInventory() {
  const [itemsFilter, setItemsFilter] = useState<string>();
  const queryClient = useQueryClient();

  const [editMaterial, setEditMaterial] = useState<string>("");

  useEffect(() => {
    if (editMaterial) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editMaterial]);

  const itemsQuery = useQuery<Record<string, any>>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const patchItemMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: Record<string, any> }) =>
      patchItem(uuid, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const deleteItemMutation = useMutation({
    mutationFn: (uuid: string) => deleteItem(uuid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const filteredItems = useMemo(() => {
    if (!itemsQuery.data) return null;

    if (!itemsFilter) {
      return itemsQuery.data;
    }

    return itemsQuery.data.filter((item: Record<string, any>) => {
      return (
        item.name.toLowerCase().includes(itemsFilter.toLowerCase()) ||
        item.description.toLowerCase().includes(itemsFilter.toLowerCase()) ||
        item.category_name?.toLowerCase().includes(itemsFilter.toLowerCase())
      );
    });
  }, [itemsQuery.data, itemsFilter]);

  return (
    <>
      <div className="mb-6">
        <div id="title" className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-black">Materials Inventory</h2>
        </div>
        <div id="search" className="rounded-lg border shadow-sm mb-6">
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
        <div
          id="manager-items"
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in"
        >
          {filteredItems?.map((item: Record<string, any>) => {
            return (
              <React.Fragment key={item.uuid}>
                <div className="rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                    ></img>
                  </div>
                  <div className="flex flex-col space-y-1.5 p-6 pb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold tracking-tight text-lg truncate flex-1 mr-2">
                        {item.name}
                      </h3>
                      <div>{item.active ? "IN" : "OUT"}</div>
                    </div>
                    <p className="text-sm text-gray-500 font-mono">
                      {item.uuid}
                    </p>
                  </div>
                  <div className="p-6 pt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500"> Category:</span>
                        <p className="font-medium">{item.category_name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500"> Quantity:</span>
                        <p className="font-medium">1</p>
                      </div>
                      <div>
                        <span className="text-gray-500"> Condition:</span>
                        <p className="font-medium">{item.condition}</p>
                      </div>
                      <div>
                        <span className="text-gray-500"> Weight:</span>
                        <p className="font-medium">{item.weight}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditMaterial(item.uuid)}
                        className="items-center justify-center gap-2 border-gray-200
                        text-sm font-medium transition-colors border border-input
                        h-9 rounded-md px-3 flex flex-1 hover:bg-neutral-100"
                      >
                        <Edit className="h-5 w-5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          patchItemMutation.mutate({
                            uuid: item.uuid,
                            data: { active: !item.active },
                          })
                        }
                        className="items-center justify-center gap-2 border-gray-200
                        text-sm font-medium transition-colors border border-input
                        h-9 rounded-md px-3 flex flex-1 hover:bg-neutral-100"
                      >
                        {item.active ? (
                          <>
                            <EyeOff className="h-5 w-5" />
                            <span>Mark OUT</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-5 w-5" />
                            <span>Mark IN</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteItemMutation.mutate(item.uuid)}
                        className="items-center justify-center gap-2 border-gray-200
                        text-sm font-medium transition-colors border border-input
                        h-9 rounded-md px-3 flex hover:bg-red-700 bg-red-800 text-white"
                      >
                        {!deleteItemMutation.isPending ? (
                          <Trash2 className="h-5 w-5" />
                        ) : (
                          <LoadingSpinner />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <ManagerEditBox
        isOpen={editMaterial != ""}
        onClose={() => setEditMaterial("")}
        itemId={editMaterial}
      />
    </>
  );
}
