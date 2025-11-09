import { useMutation, useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import { fetchCategories, fetchItem, patchItem } from "../../api";
import { useEffect, useMemo, useState } from "react";
import { Save, X } from "lucide-react";
import LoadingSpinner from "../../../loading/LoadingSpinner";

interface ItemInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const ItemInput = ({ className = "", ...props }: ItemInputProps) => {
  return (
    <input
      {...props}
      className={`flex h-10 w-full rounded-md border 
        bg-background px-3 py-2 text-base ring-offset-background
        focus-visible:ring-2 focus-visible:ring-offset-2
        md:text-sm border-gray-200 focus-visible:ring-brand ${className}`}
    />
  );
};

interface TextAreaInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const ItemTextArea = ({ className = "", ...props }: TextAreaInputProps) => {
  return (
    <textarea
      {...props}
      className={`flex h-24 w-full rounded-md border 
        bg-background px-3 py-2 text-base ring-offset-background
        focus-visible:ring-2 focus-visible:ring-offset-2
        md:text-sm border-gray-200 focus-visible:ring-brand ${className}`}
    />
  );
};

interface ItemSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const ItemSelect = ({ className = "", ...props }: ItemSelectProps) => {
  return (
    <select
      {...props}
      className={`flex h-10 w-full rounded-md border 
        bg-background px-3 py-2 text-base ring-offset-background
        focus-visible:ring-2 focus-visible:ring-offset-2
        md:text-sm border-gray-200 focus-visible:ring-brand ${className}`}
    />
  );
};

interface ItemButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ItemButton = ({ className = "", ...props }: ItemButtonProps) => {
  return (
    <button
      {...props}
      className={`flex h-10 w-full rounded-md border 
        bg-background px-3 py-2 text-base ring-offset-background
        focus-visible:ring-2 focus-visible:ring-offset-2
        md:text-sm border-gray-200 focus-visible:ring-brand ${className}`}
    />
  );
};

export default function ManagerEditBox({
  isOpen,
  onClose,
  itemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
}) {
  const [itemData, setItemData] = useState<Record<string, any>>({});

  const itemQuery = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => fetchItem(itemId),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const saveMutation = useMutation({
    mutationFn: () => patchItem(itemId, itemData),
    onSuccess: () => {
      onClose();
    },
  });

  const item = useMemo(() => {
    if (!itemQuery.data) return null;
    return itemQuery.data;
  }, [itemQuery.data]);

  const itemCondition = useMemo(() => {
    return itemData?.condition;
  }, [itemData]);

  useEffect(() => {
    if (item) {
      setItemData({ ...itemQuery.data });
    }
  }, [item]);

  const handleChange = (field: string, value: any) => {
    setItemData({ ...itemData, [field as keyof Record<string, any>]: value });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      {!itemQuery.isPending && !categoriesQuery.isPending && (
        <div
          className="bg-white m-4 p-4 rounded max-w-4xl
                    flex flex-col gap-4 relative"
        >
          <button className="absolute top-2 right-3" onClick={() => onClose()}>
            <X className="max-w-4" />
          </button>
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2 className="tracking-tight text-2xl font-bold text-black">
              Edit Material
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div
                className="aspect-square overflow-hidden
                     rounded-lg border border-gray-300"
              >
                <img
                  className="w-full h-full object-cover"
                  src={itemData.image}
                ></img>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">
                  Basic information
                </h3>

                <div>
                  <label className="text-sm font-medium">Item Name</label>
                  <ItemInput
                    value={itemData.name ? itemData.name : ""}
                    onChange={(e: any) => {
                      handleChange("name", e.target.value);
                    }}
                  ></ItemInput>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <ItemSelect
                      value={itemData.category}
                      onChange={(e: any) => {
                        handleChange("category", e.target.value);
                      }}
                    >
                      <option value=""></option>
                      {categoriesQuery.data.map((cat: Record<string, any>) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        );
                      })}
                    </ItemSelect>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Condition</label>
                    <ItemSelect
                      value={itemCondition}
                      onChange={(e: any) => {
                        handleChange("condition", e.target.value);
                      }}
                    >
                      <option value="as_new">As new</option>
                      <option value="good">Good</option>
                      <option value="decent">Decent</option>
                      <option value="bad">Bad</option>
                    </ItemSelect>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <ItemInput
                    type="number"
                    value={1}
                    onChange={() => {}}
                  ></ItemInput>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cupido-black">
                  Dimensions (mm)
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Height</label>
                    <ItemInput
                      type="number"
                      value={itemData.height != null ? itemData.height : 0}
                      onChange={(e: any) => {
                        handleChange("height", e.target.value);
                      }}
                    ></ItemInput>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Width</label>
                    <ItemInput
                      type="number"
                      value={itemData.width != null ? itemData.width : 0}
                      onChange={(e: any) => {
                        handleChange("width", e.target.value);
                      }}
                    ></ItemInput>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Depth</label>
                    <ItemInput
                      type="number"
                      value={itemData.depth != null ? itemData.depth : 0}
                      onChange={(e: any) => {
                        handleChange("depth", e.target.value);
                      }}
                    ></ItemInput>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Weight</label>
                  <ItemInput
                    type="number"
                    value={itemData.weight != null ? itemData.weight : 0}
                    onChange={(e: any) => {
                      handleChange("weight", e.target.value);
                    }}
                  ></ItemInput>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <ItemTextArea
                    value={
                      itemData.description != null ? itemData.description : 0
                    }
                    onChange={(e: any) => {
                      handleChange("description", e.target.value);
                    }}
                  ></ItemTextArea>
                </div>
                <div className="flex gap-3 pt-4">
                  <ItemButton
                    onClick={onClose}
                    className="flex items-center justify-center gap-4
                  hover:bg-neutral-100"
                  >
                    <X className="max-w-4" />
                    Cancel
                  </ItemButton>
                  <ItemButton
                    onClick={() => saveMutation.mutate()}
                    className="flex items-center justify-center gap-4
                  bg-green-400 hover:bg-green-700 text-white"
                  >
                    {!saveMutation.isPending ? (
                      <>
                        <Save className="max-w-4" />
                        Save Changes
                      </>
                    ) : (
                      <LoadingSpinner />
                    )}
                  </ItemButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("modal-root") as any
  );
}
