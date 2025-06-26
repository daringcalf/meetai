export default function AgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col gap-4 p-4 md:px-8 flex-1'>{children}</div>
  );
}
