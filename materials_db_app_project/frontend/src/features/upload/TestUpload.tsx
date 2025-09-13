import { useRef, useState } from "react";
import PageWrapper from "../layout/PageWrapper";
import Button from "../../components/Button";
import "./TestUpload.scss";

export default function TestUpload() {
  const [currentImage, setCurrentImage] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const urlify = (img: File): string => {
    return URL.createObjectURL(img);
  };

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
          {currentImage && (
            <img style={{ maxWidth: "50rem" }} src={urlify(currentImage)} />
          )}
          <div className="test-upload-btns">
            <Button onClick={() => inputRef.current?.click()}>
              Upload Image
            </Button>
            <Button onClick={() => inputRef.current?.click()}>
              Analyze Image
            </Button>
          </div>
        </div>
        <div className="test-upload-image-data"></div>
      </div>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setCurrentImage(e.target.files[0]);
          }
        }}
      />
    </PageWrapper>
  );
}
