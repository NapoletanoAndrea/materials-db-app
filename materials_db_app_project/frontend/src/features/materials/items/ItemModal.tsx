import { Ruler, Weight, X } from "lucide-react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export default function ItemModal({
  isOpen = true,
  onClose = () => {},
  item,
}: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div
        className="bg-white relative m-auto p-6
        rounded-sm max-w-[50rem]"
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="tracking-tight text-2xl font-bold">{item.name}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square overflow-hidden rounded-lg border border-gray-300">
              <img
                className="w-full h-full object-cover"
                src={item.image}
              ></img>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Item Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">UUID:</span>
                    <span className="font-mono text-sm">{item.uuid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-mono text-sm">
                      {item.category_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Condition:</span>
                    <span className="font-mono text-sm">{item.condition}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 bg-neutral-300 h-[1px] w-full"></div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                  <Ruler />
                  Dimensions
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-neutral-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Height</div>
                    <div className="font-semibold">{item.height} mm</div>
                  </div>
                  <div className="bg-neutral-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Width</div>
                    <div className="font-semibold">{item.width} mm</div>
                  </div>
                  <div className="bg-neutral-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Thickness</div>
                    <div className="font-semibold">{item.thickness} mm</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                  <Weight />
                  Weight
                </h3>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand">
                    {item.weight} g
                  </div>
                </div>
              </div>
              <div className="shrink-0 bg-neutral-300 h-[1px] w-full"></div>
              <div id="item-description">
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                  Description
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70"
        >
          <X />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") as any
  );
}
