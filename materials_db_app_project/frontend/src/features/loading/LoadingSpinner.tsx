import { Loader2 } from "lucide-react";
import "./LoadingSpinner.scss";

export default function LoadingSpinner({
  size,
  fullPage = false,
}: {
  size?: number;
  fullPage?: boolean;
}) {
  if (!size) {
    size = fullPage ? 128 : 24;
  }
  return (
    <div className={fullPage ? "loading-div" : ""}>
      <Loader2 className="spinning" size={size} />
    </div>
  );
}
