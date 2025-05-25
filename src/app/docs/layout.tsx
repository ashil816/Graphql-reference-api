import Sidebar from '@/components/layout/sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] md:gap-x-8 lg:gap-x-12 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sidebar is sticky and has its own background defined within its component or inherited */}
      <Sidebar />
      {/* Main content area for documentation pages */}
      <main className="relative py-6 lg:pt-8 bg-[#161B22] rounded-lg shadow-md mt-4 md:mt-0 md:ml-8 lg:ml-10">
        {/* Added some margin-left on medium+ screens to ensure separation if gap isn't enough due to sticky sidebar */}
        <div className="mx-auto w-full min-w-0 p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
