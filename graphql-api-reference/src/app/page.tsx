import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/sidebar"; // Import the Sidebar component

export default function HomePage() {
  return (
    <main className="flex-grow pt-14"> {/* Add padding-top to account for fixed header height */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] gap-0">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Right Content Area */}
          <div className="py-6 md:pl-8 lg:pl-10"> {/* Adjusted padding for content area */}
            <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to GraphQL API Reference</h1>
            <p className="text-lg text-muted-foreground mb-8">
              This is an interactive API reference for the GraphQL schema.
              Use the navigation on the left to explore different parts of the schema.
            </p>
            
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-card-foreground mb-3">Getting Started</h2>
              <p className="text-card-foreground/80">
                Select an item from the sidebar to view its details.
              </p>
              {/* Example usage of a shadcn component */}
              <Button className="mt-4">Explore Schema</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
