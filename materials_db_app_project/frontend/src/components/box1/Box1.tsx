export default function Box1({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="shadow-sm border
      border-gray-200
      bg-gray-50 p-6 rounded-lg"
    >
      {children}
    </div>
  );
}
