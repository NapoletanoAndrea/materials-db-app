export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-screen h-screen min-h-fit">{children}</div>;
}
