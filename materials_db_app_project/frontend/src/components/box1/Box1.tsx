export default function Box1({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="shadow-sm border
      border-gray-200
      bg-gray-100 px-4
        py-4 rounded-lg"
    >
      {children}
    </div>
  );
}
