import { loadAndParseSchema, ParsedSchema, Field as SchemaField, FieldArgument as SchemaFieldArgument, DirectiveInfo, ObjectTypeInfo, InterfaceTypeInfo, ScalarTypeInfo, EnumTypeInfo } from '@/lib/graphql/schema-parser';
import CodeBlock from '@/components/ui/code-block';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';

interface FieldPageProps {
  params: {
    type: string; // "query", "mutation", "subscription", "types", "interfaces"
    name: string; // Name of the parent type (e.g., "Query", "User")
    fieldName: string; // Name of the field
  };
}

// Helper function to generate a link for a type
function getTypePath(typeName: string, schema: ParsedSchema): string {
  const cleanedType = typeName.replace(/[\[\]!]/g, ''); 

  if (schema.queryType?.name === cleanedType) return `/docs/query/${cleanedType}`;
  if (schema.mutationType?.name === cleanedType) return `/docs/mutation/${cleanedType}`;
  if (schema.subscriptionType?.name === cleanedType) return `/docs/subscription/${cleanedType}`;
  if (schema.objectTypes.find(t => t.name === cleanedType)) return `/docs/types/${cleanedType}`;
  if (schema.inputObjectTypes.find(t => t.name === cleanedType)) return `/docs/inputs/${cleanedType}`;
  if (schema.enumTypes.find(t => t.name === cleanedType)) return `/docs/enums/${cleanedType}`;
  if (schema.scalarTypes.find(t => t.name === cleanedType)) return `/docs/scalars/${cleanedType}`;
  if (schema.interfaceTypes.find(t => t.name === cleanedType)) return `/docs/interfaces/${cleanedType}`;
  if (schema.unionTypes.find(t => t.name === cleanedType)) return `/docs/unions/${cleanedType}`;
  return ''; 
}

function RenderTypeLink({ typeString, schema }: { typeString: string, schema: ParsedSchema }) {
  const baseTypeMatch = typeString.match(/([A-Za-z0-9_]+)/);
  if (!baseTypeMatch) return <code className="font-mono text-pink-400 bg-neutral-800 px-1.5 py-0.5 rounded-md text-sm">{typeString}</code>;

  const baseTypeName = baseTypeMatch[1];
  const path = getTypePath(baseTypeName, schema);

  const parts = typeString.match(/(\[|\]|!|[A-Za-z0-9_]+)/g) || [];

  return (
    <code className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded-md text-sm">
      {parts.map((part, index) => {
        if (part === baseTypeName && path) {
          return (
            <Link key={index} href={path} className="text-accent-blue hover:underline">
              {part}
            </Link>
          );
        }
        // Color punctuation differently
        if (['[', ']', '!'].includes(part)) {
          return <span key={index} className="text-muted-foreground">{part}</span>;
        }
        return <span key={index} className={path ? "text-accent-blue" : "text-pink-400"}>{part}</span>;
      })}
    </code>
  );
}


function generateFieldSignature(field: SchemaField): string {
  const argsString = field.args.length > 0
    ? `(\n${field.args.map(arg => `  ${arg.name}: ${arg.type}${arg.defaultValue ? ` = ${JSON.stringify(arg.defaultValue)}` : ''}`).join(',\n')}\n)`
    : '';
  const directivesString = field.directives && field.directives.length > 0 
    ? " " + field.directives.map(d => {
        const args = Object.entries(d.args);
        return `@${d.name}${args.length > 0 ? `(${args.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})` : ''}`;
      }).join(' ')
    : '';
  return `${field.name}${argsString}: ${field.type}${field.isDeprecated ? ' @deprecated' : ''}${directivesString}`;
}

function generateExampleQuery(parentName: string, field: SchemaField, schema: ParsedSchema): string {
  let query = "";
  let indentationLevel = 0;
  let operationType = 'query'; 

  const isRootQueryField = schema.queryType?.name === parentName && schema.queryType.fields.some(f => f.name === field.name);
  const isRootMutationField = schema.mutationType?.name === parentName && schema.mutationType.fields.some(f => f.name === field.name);
  const isRootSubscriptionField = schema.subscriptionType?.name === parentName && schema.subscriptionType.fields.some(f => f.name === field.name);

  if (isRootMutationField) {
    operationType = 'mutation';
  } else if (isRootSubscriptionField) {
    operationType = 'subscription';
  }

  if (isRootQueryField || isRootMutationField || isRootSubscriptionField) {
    query += `${operationType} ${parentName}${field.name.charAt(0).toUpperCase() + field.name.slice(1)}Example {\n`;
    indentationLevel = 1;
  } else {
    query += `{\n`; 
    indentationLevel = 1;
    query += `${"  ".repeat(indentationLevel)}# Example assuming '${parentName.toLowerCase()}' is a query field returning ${parentName}\n`;
    query += `${"  ".repeat(indentationLevel)}${parentName.toLowerCase()}(id: "exampleId") {\n`; 
    indentationLevel++;
  }

  query += `${"  ".repeat(indentationLevel)}${field.name}`;
  
  if (field.args.length > 0) {
    query += `(\n`;
    field.args.forEach((arg, index) => {
      let defaultValuePlaceholder;
      if (arg.defaultValue !== null && arg.defaultValue !== undefined) {
        defaultValuePlaceholder = JSON.stringify(arg.defaultValue);
      } else {
        const argBaseType = arg.type.replace(/[\[\]!]/g, '');
        if (argBaseType === 'String') defaultValuePlaceholder = `"${arg.name}Value"`;
        else if (argBaseType === 'Int' || argBaseType === 'Float') defaultValuePlaceholder = "123";
        else if (argBaseType === 'Boolean') defaultValuePlaceholder = "true";
        else if (argBaseType === 'ID') defaultValuePlaceholder = `"example-id"`;
        else defaultValuePlaceholder = `{ /* Provide ${arg.type} here */ }`; 
      }
      query += `${"  ".repeat(indentationLevel + 1)}${arg.name}: ${defaultValuePlaceholder}${index < field.args.length - 1 ? ',' : ''}\n`;
    });
    query += `${"  ".repeat(indentationLevel)})`;
  }

  const returnTypeBase = field.type.replace(/[\[\]!]/g, '');
  const returnObjectTypeInfo = schema.objectTypes.find(t => t.name === returnTypeBase) || schema.interfaceTypes.find(t => t.name === returnTypeBase);
  const returnScalarTypeInfo = schema.scalarTypes.find(t => t.name === returnTypeBase);
  const returnEnumTypeInfo = schema.enumTypes.find(t => t.name === returnTypeBase);

  if (returnObjectTypeInfo && returnObjectTypeInfo.fields.length > 0) {
    query += ` {\n`;
    let subfieldCount = 0;
    for (const subField of returnObjectTypeInfo.fields) {
        if (subfieldCount >= 3) break; 
        const subFieldBaseType = subField.type.replace(/[\[\]!]/g, '');
        const isScalarOrEnum = schema.scalarTypes.some(s => s.name === subFieldBaseType) || schema.enumTypes.some(e => e.name === subFieldBaseType);
        const subFieldDetails = returnObjectTypeInfo.fields.find(f => f.name === subField.name);
        const hasRequiredArgs = subFieldDetails?.args.some(arg => arg.type.endsWith('!'));

        if (isScalarOrEnum && !hasRequiredArgs) {
            query += `${"  ".repeat(indentationLevel + 1)}${subField.name}\n`;
            subfieldCount++;
        }
    }
    if (subfieldCount === 0 && returnObjectTypeInfo.fields.length > 0) { 
        const firstSubField = returnObjectTypeInfo.fields[0];
        const hasRequiredArgs = firstSubField.args.some(arg => arg.type.endsWith('!'));
        if (!hasRequiredArgs) {
            query += `${"  ".repeat(indentationLevel + 1)}${firstSubField.name}\n`;
        } else {
            query += `${"  ".repeat(indentationLevel + 1)}# ... (select subfields for ${returnTypeBase}, some require arguments)\n`;
        }
    }
    if (subfieldCount === 0 && returnObjectTypeInfo.fields.length === 0 && !isScalarType(returnTypeBase, schema) && !isEnumType(returnTypeBase, schema)) {
        query += `${"  ".repeat(indentationLevel + 1)}# ... (no simple subfields found, add fields for ${returnTypeBase})\n`;
    }
    query += `${"  ".repeat(indentationLevel)}}`;
  }
  
  query += `\n${"  ".repeat(indentationLevel -1)}}`;
  
  return query;
}

function isScalarType(typeName: string, schema: ParsedSchema): boolean {
  return schema.scalarTypes.some(s => s.name === typeName);
}

function isEnumType(typeName: string, schema: ParsedSchema): boolean {
  return schema.enumTypes.some(e => e.name === typeName);
}


export default async function FieldDetailPage({ params }: FieldPageProps) {
  const schema = loadAndParseSchema('src/schema/schema.graphql'); 
  const { type: parentTypeCategory, name: parentNameEncoded, fieldName: fieldNameEncoded } = params;

  const parentName = decodeURIComponent(parentNameEncoded);
  const fieldName = decodeURIComponent(fieldNameEncoded);

  let parentItem: ObjectTypeInfo | InterfaceTypeInfo | undefined | null;

  switch (parentTypeCategory) {
    case 'query':
      parentItem = schema.queryType;
      break;
    case 'mutation':
      parentItem = schema.mutationType;
      break;
    case 'subscription':
      parentItem = schema.subscriptionType;
      break;
    case 'types':
      parentItem = schema.objectTypes.find(t => t.name === parentName);
      break;
    case 'interfaces':
      parentItem = schema.interfaceTypes.find(t => t.name === parentName);
      break;
    default:
      notFound();
  }

  if (!parentItem || parentItem.name !== parentName) {
    console.error(`Parent item not found or name mismatch: ${parentTypeCategory}/${parentName}`);
    notFound();
  }

  const field = parentItem.fields.find(f => f.name === fieldName);

  if (!field) {
    console.error(`Field not found: ${fieldName} in ${parentName}`);
    notFound();
  }

  const signature = generateFieldSignature(field);
  const pageTitle = `${parentName}.${fieldName}`;
  const exampleQuery = generateExampleQuery(parentName, field, schema);
  const isOperation = parentTypeCategory === 'query' || parentTypeCategory === 'mutation';

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none 
                       prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-foreground
                       prose-p:text-muted-foreground prose-p:my-2
                       prose-a:text-accent-blue hover:prose-a:text-blue-300 
                       prose-strong:text-foreground 
                       prose-code:text-foreground prose-code:bg-neutral-700/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono
                       prose-code:before:content-none prose-code:after:content-none 
                       prose-hr:border-border/40 prose-hr:my-6
                       prose-ul:list-none prose-ul:pl-0 prose-li:pl-0">
      <div className="mb-6 pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">
          Field on <Link href={`/docs/${parentTypeCategory}/${parentName}`} className="hover:underline">{parentName}</Link>
        </p>
        <h1 className="!mb-1 !mt-0">{pageTitle}</h1>
        <div className="text-lg text-muted-foreground">
          Type: <RenderTypeLink typeString={field.type} schema={schema} />
        </div>
        {field.isDeprecated && (
          <Badge variant="destructive" className="mt-2 text-xs px-2 py-0.5">
            DEPRECATED{field.deprecationReason ? `: ${field.deprecationReason}` : ''}
          </Badge>
        )}
        {field.description && <p className="mt-3 text-lg">{field.description}</p>}
      </div>

      <Separator className="my-8" />

      {field.args.length > 0 && (
        <div className="my-6">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Arguments</h3>
          <div className="space-y-4 rounded-md border border-border p-4 bg-card/50">
            {field.args.map((arg: SchemaFieldArgument, index) => (
              <div key={arg.name} className={`pb-3 ${index < field.args.length - 1 ? 'border-b border-border/20' : ''}`}>
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-foreground mr-2 font-mono">{arg.name}</span>: 
                  <span className="ml-1"><RenderTypeLink typeString={arg.type} schema={schema} /></span>
                   {arg.type.endsWith('!') && <span className="text-red-500 ml-1 text-xs">(required)</span>}
                </div>
                {arg.description && <p className="text-sm text-muted-foreground ml-1">{arg.description}</p>}
                {arg.defaultValue !== null && arg.defaultValue !== undefined && (
                  <p className="text-sm text-gray-400 mt-1 ml-1">Default: <code className="text-xs bg-neutral-700 p-0.5 rounded">{String(arg.defaultValue)}</code></p>
                )}
                {arg.directives && arg.directives.length > 0 && (
                  <div className="mt-2 ml-1">
                    <span className="text-xs text-muted-foreground">Directives: </span>
                    {arg.directives.map(dir => (
                      <Badge key={dir.name} variant="outline" className="mr-1 text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                        @{dir.name}
                        {Object.keys(dir.args).length > 0 && (
                          <span>({Object.entries(dir.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
      {field.args.length === 0 && (
         <div className="my-6 py-5 border-t border-b border-border/40">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Arguments</h3>
            <p className="text-sm text-muted-foreground">This field does not accept any arguments.</p>
         </div>
      )}


      {field.directives && field.directives.length > 0 && (
        <div className="my-6">
          <h2 className="text-2xl font-semibold mb-3">Directives</h2>
          <div className="flex flex-wrap gap-2">
            {field.directives.map(dir => (
              <Badge key={dir.name} variant="outline" className="text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                @{dir.name}
                {Object.keys(dir.args).length > 0 && (
                  <span>({Object.entries(dir.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})</span>
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {(field.directives && field.directives.length > 0) && <Separator className="my-6" />}


      <h2 className="text-2xl font-semibold mt-6 mb-3">GraphQL Definition</h2>
      <CodeBlock code={signature} language="graphql" />
      
      { (parentTypeCategory === 'query' || parentTypeCategory === 'mutation') && (
        <>
          <Separator className="my-8" />
          <InteractiveExplorer field={field} parentName={parentName} parentTypeCategory={parentTypeCategory as ('query' | 'mutation')} schema={schema} />
        </>
      )}

    </article>
  );
}

export async function generateStaticParams() {
  const schema = loadAndParseSchema('src/schema/schema.graphql');
  const paths: { type: string; name: string; fieldName: string }[] = [];

  const addFieldPaths = (item: ObjectTypeInfo | InterfaceTypeInfo | null | undefined, typeCategory: string) => {
    if (item && item.fields) {
      item.fields.forEach(field => {
        if (item.name) { // Ensure parentName is valid
          paths.push({ type: typeCategory, name: item.name, fieldName: field.name });
        }
      });
    }
  };

  addFieldPaths(schema.queryType, 'query');
  addFieldPaths(schema.mutationType, 'mutation');
  // Subscriptions might not be interactive in the same way, skip for now or add later if needed
  // addFieldPaths(schema.subscriptionType, 'subscription'); 
  schema.objectTypes.forEach(obj => addFieldPaths(obj, 'types'));
  schema.interfaceTypes.forEach(iface => addFieldPaths(iface, 'interfaces'));
  
  return paths.map(p => ({ 
    type: p.type, 
    name: encodeURIComponent(p.name), 
    fieldName: encodeURIComponent(p.fieldName) 
  }));
}
