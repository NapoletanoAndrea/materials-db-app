import Container from "../../../layout/Container";

export default function ManagerBanner() {
  return (
    <div className="bg-black text-cupido-white py-8 text-white mb-8">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Manager Dashboard
            </h1>
            <p className="text-lg opacity-90">Welcome back, name</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
