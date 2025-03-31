export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap2">
      <main className="main">{children}</main>
    </div>
  );
}
