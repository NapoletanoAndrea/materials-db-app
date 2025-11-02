import { useMemo, useRef, useState } from "react";
import PageWrapper from "../../layout/PageWrapper";
import Button from "../../../components/Button";
import "./TestUpload.scss";
import { useMutation } from "@tanstack/react-query";
import { analyzeImage, createItem } from "../api";
import LoadingSpinner from "../../loading/LoadingSpinner";
import { compressImage } from "../../../utils";

export default function TestUpload() {
  const [currentImage, setCurrentImage] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const imageUrl = useMemo((): string => {
    return currentImage ? URL.createObjectURL(currentImage) : "";
  }, [currentImage]);

  const analyzeMutation = useMutation<any>({
    mutationFn: () => analyzeImage({ image: currentImage as File }),
  });

  const createItemMutation = useMutation<any>({
    mutationFn: () => {
      const data = { ...analyzeMutation.data.result };
      data["image"] = currentImage;
      return createItem(data);
    },
  });

  return (
    <PageWrapper>
      <div className="test-upload">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {imageUrl && <img style={{ maxWidth: "30rem" }} src={imageUrl} />}
          <div className="test-upload-btns">
            <Button onClick={() => inputRef.current?.click()}>
              Upload Image
            </Button>
            <Button onClick={() => analyzeMutation.mutate()}>
              Analyze Image
              {analyzeMutation.isPending && <LoadingSpinner />}
            </Button>
          </div>
        </div>
        <div className="test-upload-image-data">
          {!analyzeMutation.isPending && analyzeMutation.data ? (
            <>
              {Object.entries(analyzeMutation.data.result).map(
                ([key, value], i) => (
                  <div key={i}>
                    <span>{key + ": " + value}</span>
                  </div>
                )
              )}
              <div>{analyzeMutation.data.token_count}</div>
              <Button
                onClick={() => {
                  createItemMutation.mutate();
                }}
              >
                Add to Database
              </Button>
            </>
          ) : null}
        </div>
      </div>
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
    </PageWrapper>
  );
}
