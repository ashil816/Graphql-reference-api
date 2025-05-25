"use client"; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, HelpCircle, Search, Menu as MenuIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; 
import Sidebar from './sidebar'; 
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/overview", label: "Overview" },
    { href: "/docs/authentication", label: "Authentication" },
    { href: "/docs/api", label: "API Reference" },
    { href: "/docs/tutorials", label: "Tutorials" },
    { href: "/support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> {/* border-border/40 from mock, but border-border is fine */}
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden mr-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="text-foreground hover:bg-accent">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4 sm:w-1/2 p-0 bg-background border-r border-border">
              {/* Sidebar for mobile will have its own padding defined internally */}
              <Sidebar /> 
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Logo and Navigation */}
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-accent-blue" // Updated color
              fill="currentColor"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm0 22.286c-5.675 0-10.286-4.61-10.286-10.286S6.325 1.714 12 1.714s10.286 4.61 10.286 10.286S17.675 22.286 12 22.286Z M12.012 4.016c-.414.002-.75.32.75.734l.002-.002c.506.078.915.461 1.025.965l2.438 5.083-3.197-1.109-.001-6.186ZM8.103 7.205l3.897-1.355.001 6.186-3.196-2.395v-2.682Zm0 10.099l3.738-1.261.001-5.911-3.739 2.773v4.4ZM15.898 17.304l-3.74-1.261V9.946l3.74-2.773v10.131ZM12 18.15l3.897-10.945.001 7.692-3.898 2.934v.319Zm0-12.299l-3.897 1.354.001 7.692 3.897 2.934V5.85Zm0 14.001l-.901-2.804-3.738 1.261 4.64 3.049 4.64-3.049-3.74-1.261-.901 2.804Z" />
            </svg>
            <span className="hidden font-bold sm:inline-block text-foreground">
              GraphQL API Reference
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm"> {/* Use gap-6 as per index.html */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground pb-1 ${ /* Added pb-1 for border spacing */
                  pathname === item.href
                    ? 'font-semibold text-foreground border-b-2 border-accent-blue' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Centered Logo on Mobile */}
        <div className="flex-1 flex justify-center md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-accent-blue" 
              fill="currentColor"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm0 22.286c-5.675 0-10.286-4.61-10.286-10.286S6.325 1.714 12 1.714s10.286 4.61 10.286 10.286S17.675 22.286 12 22.286Z M12.012 4.016c-.414.002-.75.32.75.734l.002-.002c.506.078.915.461 1.025.965l2.438 5.083-3.197-1.109-.001-6.186ZM8.103 7.205l3.897-1.355.001 6.186-3.196-2.395v-2.682Zm0 10.099l3.738-1.261.001-5.911-3.739 2.773v4.4ZM15.898 17.304l-3.74-1.261V9.946l3.74-2.773v10.131ZM12 18.15l3.897-10.945.001 7.692-3.898 2.934v.319Zm0-12.299l-3.897 1.354.001 7.692 3.897 2.934V5.85Zm0 14.001l-.901-2.804-3.738 1.261 4.64 3.049 4.64-3.049-3.74-1.261-.901 2.804Z" />
            </svg>
            <span className="font-bold sm:inline-block text-foreground">
              API Reference
            </span>
          </Link>
        </div>

        {/* Right Section: Search and Icons */}
        <div className="flex items-center justify-end space-x-2 md:ml-auto"> {/* Use ml-auto for desktop right alignment */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-3 py-2 relative h-9 w-full justify-start rounded-[0.5rem] bg-card text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="hidden lg:inline-flex">Search...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
          <nav className="flex items-center">
            <Link
              href="https://github.com/hasura/graphql-engine/tree/master/community/tools/graphql-schema-registry" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-md"
              title="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="/help" 
              className="p-2 hover:bg-accent rounded-md"
              title="Help"
            >
              <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Help</span>
            </Link>
            {/* User avatar placeholder */}
            <div className="ml-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs text-foreground">
              U
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
