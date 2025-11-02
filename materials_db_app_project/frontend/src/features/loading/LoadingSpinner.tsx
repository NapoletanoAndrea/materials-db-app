import { Loader2 } from "lucide-react";
import "./LoadingSpinner.scss";

export default function LoadingSpinner({
  size,
  fullPage = false,
  className = "",
}: {
  size?: number;
  fullPage?: boolean;
  className?: string;
}) {
  if (!size) {
    size = fullPage ? 128 : 24;
  }
  return (
    <div className={fullPage ? "loading-div" : ""}>
      <Loader2 className={"spinning " + className} size={size} />
    </div>
  );
}
