import { useQuery } from "@tanstack/react-query";
import Container from "../../../layout/Container";
import { fetchCurrentUser } from "../../../auth/api";

export default function ManagerBanner() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
  });

  return (
    <div className="bg-black text-cupido-white py-8 text-white mb-8">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Manager Dashboard
            </h1>
            <p className="text-lg opacity-90">{`Welcome back, ${query.data?.first_name}`}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
