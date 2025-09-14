export default function Item({ item }: { item: Record<string, any> }) {
  return (
    <>
      <div
        style={{ maxWidth: "20rem", borderRadius: ".5rem", overflow: "hidden" }}
      >
        <img src={item.image}></img>
        <div className="item-menu">
          <span className="font-semibold">{item.name}</span>
        </div>
      </div>
    </>
  );
}
