export default function Item({
  item,
  onClick = () => {},
}: {
  item: Record<string, any>;
  onClick: ()=>void;
}) {
  return (
    <>
      <div
      onClick={onClick}
        className="rounded-lg shadow-sm border border-gray-200
         hover:shadow-md transition-shadow
          cursor-pointer overflow-hidden"
      >
        <div className="aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover
            hover:scale-105
            transition-transform
            duration-300"
            src={item.image}
          ></img>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm truncate flex-1 mr-2">
              {item.name}
            </h3>
            <div
              className="inline-flex items-center rounded-full
              px-2.5 py-0.5 font-semibold
              text-xs bg-gray-100"
            >
              {item.category_name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
