import { useEffect, useRef, useState } from "react";
import { compressImage } from "../../../../utils";
import { UploadIcon } from "lucide-react";
import { analyzeImage, createItem } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../loading/LoadingSpinner";

export default function UploadMaterialsBox() {
  const [currentImage, setCurrentImage] = useState<File | undefined>(undefined);
  const [successfullyUploaded, setSuccessfullyUploaded] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const createItemMutation = useMutation<any>({
    mutationFn: () => {
      const data = { ...analyzeMutation.data.result };
      data["image"] = currentImage;
      data["active"] = true;
      return createItem(data);
    },
    onSuccess() {
      setSuccessfullyUploaded(true);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const analyzeMutation = useMutation<any>({
    mutationFn: () => analyzeImage({ image: currentImage as File }),
    onMutate: () => {
      setSuccessfullyUploaded(false);
    },
  });

  useEffect(() => {
    if (analyzeMutation.isSuccess) {
      createItemMutation.mutate();
    }
  }, [analyzeMutation.isSuccess]);

  useEffect(() => {
    if (currentImage) {
      analyzeMutation.mutate();
    }
  }, [currentImage]);

  //   const imageUrl = useMemo((): string => {
  //     return currentImage ? URL.createObjectURL(currentImage) : "";
  //   }, [currentImage]);

  return (
    <>
      <div className="rounded-lg border border-neutral-200 shadow-sm top-4">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            AI Material Analysis
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-6">
            <div
              className="rounded-lg shadow-sm 
                    border-2 border-dashed border-neutral-200 transition-colors
                    duration-200 hover:border-red-800"
            >
              <div className="p-8">
                <div
                  role="presentation"
                  className="text-center cursor-pointer transition-all duration-200"
                  onClick={() => inputRef.current?.click()}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 rounded-full bg-red-100  transition-all duration-200">
                      {!analyzeMutation.isPending ? (
                        <UploadIcon className="text-red-700 w-8 h-8" />
                      ) : (
                        <LoadingSpinner className="text-red-700 w-8 h-8" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        Upload Material Images
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Click to browse. AI will analyze each material
                        automatically
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {analyzeMutation.isPending || createItemMutation.isPending ? (
        <div
          className="mt-2 flex gap-2 text-gray-600 bg-neutral-100 p-4
          rounded"
        >
          Analyzing with AI...
          <LoadingSpinner />
        </div>
      ) : successfullyUploaded ? (
        <div
          className="mt-2 flex gap-2 text-green-600 bg-green-100 p-4
          rounded justify-between"
        >
          Successfuly Uploaded
        </div>
      ) : null}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const compressed = await compressImage(file, 640, 0.7);
          setCurrentImage(compressed);
        }}
      />
    </>
  );
}
