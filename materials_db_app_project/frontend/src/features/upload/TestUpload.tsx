// import { useState } from "react";
import PageWrapper from "../layout/PageWrapper";
import Button from "../../components/Button";

export default function TestUpload() {
//   const [currentImage, setCurrentImage] = useState<string>("");

  return (
    <PageWrapper>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="test-upload-btns">
            <Button>fsdf</Button>
        </div>
      </div>
    </PageWrapper>
  );
}
