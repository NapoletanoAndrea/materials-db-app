export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full min-h-fit">{children}</div>;
}
