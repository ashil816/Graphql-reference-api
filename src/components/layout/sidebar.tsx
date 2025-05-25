"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState, useMemo } from 'react';
import { loadAndParseSchema, ParsedSchema, Field, InputField, EnumValue, ScalarTypeInfo, ObjectTypeInfo } from '@/lib/graphql/schema-parser'; // Assuming types are exported

const Sidebar = () => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [schema, setSchema] = useState<ParsedSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const parserModule = await import('@/lib/graphql/schema-parser');
        const parsedSchema = parserModule.loadAndParseSchema('src/schema/schema.graphql');
        setSchema(parsedSchema);
      } catch (e: any) {
        console.error("Error loading schema in Sidebar:", e);
        setError(`Failed to load schema: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchema();
  }, []);

  const filteredSchema = useMemo(() => {
    if (!schema) return null;
    if (!searchTerm.trim()) {
      // When no search term, determine open accordions based on current path
      const currentOpen: string[] = [];
      if (schema.queryType && pathname.startsWith(`/docs/query/${schema.queryType.name}`)) currentOpen.push(schema.queryType.name);
      if (schema.mutationType && pathname.startsWith(`/docs/mutation/${schema.mutationType.name}`)) currentOpen.push(schema.mutationType.name);
      if (schema.subscriptionType && pathname.startsWith(`/docs/subscription/${schema.subscriptionType.name}`)) currentOpen.push(schema.subscriptionType.name);
      
      schema.objectTypes.forEach(type => {
        if (pathname.startsWith(`/docs/types/${type.name}`)) currentOpen.push(type.name);
      });
      schema.inputObjectTypes.forEach(type => {
        if (pathname.startsWith(`/docs/inputs/${type.name}`)) currentOpen.push(type.name);
      });
      setOpenAccordions(currentOpen);
      return schema;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const newOpenAccordions: string[] = [];

    const filterItems = <T extends { name: string }>(items: T[] | undefined | null): T[] => {
      if (!items) return [];
      return items.filter(item => item.name.toLowerCase().includes(lowerSearchTerm));
    };
    
    const filterFields = (fields: (Field | InputField)[]) => 
      fields.filter(field => field.name.toLowerCase().includes(lowerSearchTerm));
    
    const processType = (type: ObjectTypeInfo | null | undefined, isRootType: boolean = false) => {
      if (!type) return null;
      const typeNameLower = type.name.toLowerCase();
      const fields = type.fields || [];
      const filteredFields = filterFields(fields);

      if (typeNameLower.includes(lowerSearchTerm) || filteredFields.length > 0) {
        if (filteredFields.length > 0 || (isRootType && typeNameLower.includes(lowerSearchTerm))) {
          newOpenAccordions.push(type.name);
        }
        // If the type name matches, show all fields. Otherwise, show only filtered fields.
        return { ...type, fields: typeNameLower.includes(lowerSearchTerm) ? fields : filteredFields };
      }
      return null;
    };
    
    const objectTypes = (schema.objectTypes || []).map(type => {
        const typeNameLower = type.name.toLowerCase();
        const filteredFields = filterFields(type.fields);
        if (typeNameLower.includes(lowerSearchTerm) || filteredFields.length > 0) {
            newOpenAccordions.push(type.name);
            return { ...type, fields: typeNameLower.includes(lowerSearchTerm) ? type.fields : filteredFields };
        }
        return null;
    }).filter((item): item is ObjectTypeInfo => item !== null);

    const inputObjectTypes = (schema.inputObjectTypes || []).map(type => {
        const typeNameLower = type.name.toLowerCase();
        const filteredFields = filterFields(type.fields);
        if (typeNameLower.includes(lowerSearchTerm) || filteredFields.length > 0) {
            newOpenAccordions.push(type.name);
            return { ...type, fields: typeNameLower.includes(lowerSearchTerm) ? type.fields : filteredFields };
        }
        return null;
    }).filter((item): item is InputObjectTypeInfo => item !== null);
          
    setOpenAccordions(newOpenAccordions);

    return {
      queryType: processType(schema.queryType, true),
      mutationType: processType(schema.mutationType, true),
      subscriptionType: processType(schema.subscriptionType, true),
      objectTypes,
      inputObjectTypes,
      enumTypes: filterItems(schema.enumTypes),
      scalarTypes: filterItems(schema.scalarTypes),
    };
  }, [schema, searchTerm, pathname]);

  const isActive = (path: string) => pathname === path;

  const renderFieldList = (fields: (Field | InputField)[], parentType: string, parentName: string, isInput: boolean = false) => (
    <ul className="pl-4 mt-1 space-y-0.5">
      {fields.map(field => (
        <li key={field.name}>
          <Link
            href={`/docs/${section}/${parentName}/${field.name}`} // Link to field detail page
            className={`block px-2 py-1 text-xs hover:text-foreground rounded-md transition-colors ${
              isActive(`/docs/${section}/${parentName}/${field.name}`, true) 
                ? 'text-primary font-semibold bg-muted' 
                : 'text-muted-foreground hover:bg-accent/50'
            }`}
          >
            {field.name}
            {!isInput && (field as Field).args && (field as Field).args.length > 0 ? '(...)' : ''}: {field.type}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderRootTypeSection = (type: ObjectTypeInfo | null | undefined, sectionType: 'query' | 'mutation' | 'subscription', sectionLabel: string) => {
    if (!type || (type.fields.length === 0 && !type.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '')) return null;
    
    const sectionPath = `/docs/${sectionType}/${type.name}`;
    return (
      <AccordionItem value={type.name} key={type.name} className="border-b-0">
        <AccordionTrigger
          className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 ${isActive(sectionPath, true) ? 'font-medium text-primary bg-accent' : 'text-muted-foreground'}`}
        >
          <Link href={sectionPath} className="flex-grow text-left" onClick={(e) => {
            // Allow navigation if not expanding/collapsing
            if ((e.target as HTMLElement).closest('.lucide-chevron-down')) {
              return;
            }
            // For direct click on name, navigate
          }}>
            {type.name}
          </Link>
           {type.fields.length > 0 && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-hover:text-foreground" />}
        </AccordionTrigger>
        {type.fields.length > 0 && (
            <AccordionContent className="pb-1 pl-2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {renderFieldList(type.fields, sectionType, type.name)}
            </AccordionContent>
        )}
      </AccordionItem>
    );
  }

  if (isLoading) {
    return (
      <aside className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem-1px)] w-full max-w-xs overflow-y-auto py-6 pr-4 border-r border-border">
        <div className="relative mb-4 pr-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Loading schema..." className="pl-9 w-full" disabled />
        </div>
        <p className="text-muted-foreground px-2">Loading navigation...</p>
      </aside>
    );
  }

  if (error || !schema) { // Check schema here, not filteredSchema
    return (
      <aside className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem-1px)] w-full max-w-xs overflow-y-auto py-6 pr-4 border-r border-border">
        <div className="relative mb-4 pr-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Error loading schema" className="pl-9 w-full" disabled />
        </div>
        <p className="text-destructive px-2">{error || "Schema data is not available."}</p>
      </aside>
    );
  }
  
  const displaySchema = filteredSchema || schema; // Fallback to full schema if filter returns null

  return (
    <aside className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem-1px)] w-full max-w-xs overflow-y-auto py-6 pr-2 border-r border-border">
      <div className="relative mb-4 pr-2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search schema..."
          className="w-full pl-9" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100%-4rem)] pr-2">
        <nav className="flex flex-col gap-2 text-sm">
          {(displaySchema.queryType || displaySchema.mutationType || displaySchema.subscriptionType) && (
            <div>
              <h4 className="mb-1 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Schema Root
              </h4>
              <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full">
                {displaySchema.queryType && renderRootTypeSection(displaySchema.queryType, 'query', 'Query')}
                {displaySchema.mutationType && renderRootTypeSection(displaySchema.mutationType, 'mutation', 'Mutation')}
                {displaySchema.subscriptionType && renderRootTypeSection(displaySchema.subscriptionType, 'subscription', 'Subscription')}
              </Accordion>
            </div>
          )}

          {displaySchema.objectTypes.length > 0 && (
            <div>
              <h4 className="mb-1 mt-4 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Types
              </h4>
              <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full">
                {displaySchema.objectTypes.map((type) => (
                  <AccordionItem value={type.name} key={type.name} className="border-b-0">
                    <AccordionTrigger 
                      className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 ${isActive(`/docs/types/${type.name}`) ? 'font-medium text-primary bg-accent' : 'text-muted-foreground'}`}
                    >
                       <Link href={`/docs/types/${type.name}`} className="flex-grow text-left" onClick={(e) => e.stopPropagation()}>{type.name}</Link>
                       {type.fields.length > 0 && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-hover:text-foreground" />}
                    </AccordionTrigger>
                    {type.fields.length > 0 && (
                        <AccordionContent className="pb-1 pl-2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            {renderFieldList(type.fields, 'types', type.name)}
                        </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {displaySchema.inputObjectTypes.length > 0 && (
            <div>
              <h4 className="mb-1 mt-4 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Input Types
              </h4>
              <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full">
                {displaySchema.inputObjectTypes.map((type) => (
                  <AccordionItem value={type.name} key={type.name} className="border-b-0">
                    <AccordionTrigger className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 ${isActive(`/docs/inputs/${type.name}`) ? 'font-medium text-primary bg-accent' : 'text-muted-foreground'}`}>
                      <Link href={`/docs/inputs/${type.name}`} className="flex-grow text-left" onClick={(e) => e.stopPropagation()}>{type.name}</Link>
                      {type.fields.length > 0 && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-hover:text-foreground" />}
                    </AccordionTrigger>
                    {type.fields.length > 0 && (
                        <AccordionContent className="pb-1 pl-2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                           {renderFieldList(type.fields, 'inputs', type.name, true)}
                        </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {displaySchema.enumTypes.length > 0 && (
            <div>
              <h4 className="mb-1 mt-4 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Enums
              </h4>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {displaySchema.enumTypes.map((type) => (
                  <Link
                    key={type.name}
                    href={`/docs/enums/${type.name}`}
                    className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors ${isActive(`/docs/enums/${type.name}`, true) ? 'font-medium text-primary bg-accent' : 'text-muted-foreground hover:bg-accent/50'}`}
                  >
                    {type.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {displaySchema.scalarTypes.length > 0 && (
             <div>
              <h4 className="mb-1 mt-4 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Scalars
              </h4>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {displaySchema.scalarTypes.map((type) => (
                  <Link
                    key={type.name}
                    href={`/docs/scalars/${type.name}`}
                    className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors ${isActive(`/docs/scalars/${type.name}`, true) ? 'font-medium text-primary bg-accent' : 'text-muted-foreground hover:bg-accent/50'}`}
                  >
                    {type.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
