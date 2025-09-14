export default function Item({ item }: { item: Record<string, any> }) {
  return (
    <>
      <div
        className="item"
      >
        <img className="item-image" src={item.image}></img>
        <div className="item-menu">
          <span className="font-semibold">{item.name}</span>
        </div>
      </div>
    </>
  );
}
