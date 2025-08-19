export default function HomePage() {
  return (
    <section>
      <div className="container">
        <h1 className="h5">Home</h1>
        <button className="btn" onClick={() => console.log(Date.now() / 1000)}>
          Clear
        </button>
      </div>
    </section>
  );
}
