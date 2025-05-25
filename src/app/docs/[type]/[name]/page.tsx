import { loadAndParseSchema, ParsedSchema, ObjectTypeInfo, InputObjectTypeInfo, EnumTypeInfo, ScalarTypeInfo, Field as SchemaField, InputField as SchemaInputField, EnumValue as SchemaEnumValue, DirectiveInfo, InterfaceTypeInfo, UnionTypeInfo } from '@/lib/graphql/schema-parser';
import CodeBlock from '@/components/ui/code-block';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';

interface PageProps {
  params: {
    type: string; // e.g., "types", "query", "mutation", "enums", "scalars", "interfaces", "unions"
    name: string; // e.g., "User", "Query", "UserRole", "DateTime"
  };
}

// Helper function to generate a link for a type (copied for self-containment, ideally from a shared util)
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
    <code className="font-mono text-pink-400 bg-neutral-800 px-1.5 py-0.5 rounded-md text-sm">
      {parts.map((part, index) => {
        if (part === baseTypeName && path) {
          return (
            <Link key={index} href={path} className="hover:underline text-blue-400">
              {part}
            </Link>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </code>
  );
}

function generateTypeSignature(item: ObjectTypeInfo | InputObjectTypeInfo | EnumTypeInfo | ScalarTypeInfo | InterfaceTypeInfo | UnionTypeInfo, itemType: string): string {
  if (!item) return "Not found.";
  let signature = "";

  const directivesString = (directives: DirectiveInfo[] | undefined) => 
    directives && directives.length > 0 
      ? " " + directives.map(d => {
          const args = Object.entries(d.args);
          return `@${d.name}${args.length > 0 ? `(${args.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})` : ''}`;
        }).join(' ')
      : '';

  switch (itemType) {
    case 'query':
    case 'mutation':
    case 'subscription':
    case 'types':
    case 'interfaces': // Added interfaces here
      const typeItem = item as ObjectTypeInfo | InterfaceTypeInfo;
      const typeKeyword = itemType === 'interfaces' ? 'interface' : 'type';
      const implementsInterfaces = (typeItem as ObjectTypeInfo).interfaces?.length > 0 ? ` implements ${ (typeItem as ObjectTypeInfo).interfaces!.join(' & ')}` : '';
      
      const typeFields = typeItem.fields.map(f => {
        const argsString = f.args.length > 0 ? `(${f.args.map(arg => `${arg.name}: ${arg.type}${arg.defaultValue ? ` = ${JSON.stringify(arg.defaultValue)}` : ''}`).join(', ')})` : '';
        const fieldDirectives = f.directives && f.directives.length > 0 ? " " + f.directives.map(d => `@${d.name}${Object.keys(d.args).length > 0 ? `(${Object.entries(d.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})` : ''}`).join(' ') : '';
        return `  ${f.name}${argsString}: ${f.type}${fieldDirectives}${f.isDeprecated ? ' @deprecated' : ''}`;
      }).join('\n');
      signature = `${typeKeyword} ${typeItem.name}${implementsInterfaces}${directivesString(typeItem.directives)} {\n${typeFields}\n}`;
      break;
    case 'inputs':
      const inputItem = item as InputObjectTypeInfo;
      const inputFields = inputItem.fields.map(f => {
        const fieldDirectives = f.directives && f.directives.length > 0 ? " " + f.directives.map(d => `@${d.name}${Object.keys(d.args).length > 0 ? `(${Object.entries(d.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})` : ''}`).join(' ') : '';
        return `  ${f.name}: ${f.type}${f.defaultValue ? ` = ${String(f.defaultValue)}` : ''}${fieldDirectives}`;
      }).join('\n');
      signature = `input ${inputItem.name}${directivesString(inputItem.directives)} {\n${inputFields}\n}`;
      break;
    case 'enums':
      const enumItem = item as EnumTypeInfo;
      const enumValues = enumItem.values.map(v => {
        const valueDirectives = v.directives && v.directives.length > 0 ? " " + v.directives.map(d => `@${d.name}${Object.keys(d.args).length > 0 ? `(${Object.entries(d.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})` : ''}`).join(' ') : '';
        return `  ${v.name}${valueDirectives}${v.isDeprecated ? ' @deprecated' : ''}`;
      }).join('\n');
      signature = `enum ${enumItem.name}${directivesString(enumItem.directives)} {\n${enumValues}\n}`;
      break;
    case 'scalars':
      const scalarItem = item as ScalarTypeInfo;
      signature = `scalar ${scalarItem.name}${directivesString(scalarItem.directives)}`;
      if (scalarItem.specifiedByUrl) {
        signature += ` @specifiedBy(url: "${scalarItem.specifiedByUrl}")`;
      }
      break;
    case 'unions':
      const unionItem = item as UnionTypeInfo;
      const possibleTypes = unionItem.possibleTypes.join(' | ');
      signature = `union ${unionItem.name}${directivesString(unionItem.directives)} = ${possibleTypes}`;
      break;
    default:
      signature = `Unknown type: ${itemType}`;
  }
  return signature;
}

const renderFieldsSection = (fields: SchemaField[], parentTypeCategory: string, parentName: string, schema: ParsedSchema) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-4 text-foreground">Fields</h3>
    <ul className="space-y-6">
      {fields.map(field => (
        <li key={field.name} className="border-b border-border/40 pb-4 last:border-b-0 last:pb-0">
          <div className="mb-2">
            <Link href={`/docs/${parentTypeCategory}/${parentName}/${field.name}`} className="text-xl font-semibold text-blue-400 hover:underline">
              {field.name}
            </Link>
            {field.args.length > 0 && <span className="text-muted-foreground text-sm ml-1">(...)</span>}
            <span className="font-mono text-sm text-pink-400 ml-2">: <RenderTypeLink typeString={field.type} schema={schema} /></span>
            {field.isDeprecated && <Badge variant="destructive" className="ml-2 text-xs">DEPRECATED</Badge>}
          </div>
          {field.deprecationReason && <p className="text-sm text-yellow-500 italic mb-1">Deprecated: {field.deprecationReason}</p>}
          {field.description && <p className="text-sm text-muted-foreground mb-2">{field.description}</p>}
          {field.directives && field.directives.length > 0 && (
              <div className="mt-1 mb-2">
                {field.directives.map(dir => (
                  <Badge key={dir.name} variant="outline" className="mr-1 text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                    @{dir.name}
                    {Object.keys(dir.args).length > 0 && (
                      <span>({Object.entries(dir.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})</span>
                    )}
                  </Badge>
                ))}
              </div>
            )}
        </li>
      ))}
    </ul>
  </div>
);

const renderInputFieldsSection = (fields: SchemaInputField[], schema: ParsedSchema) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-4 text-foreground">Fields</h3>
    <ul className="space-y-4">
      {fields.map(field => (
        <li key={field.name} className="border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
          <div className="mb-1">
            <span className="text-xl font-semibold text-blue-400 mr-2">{field.name}</span>
            <span className="font-mono text-sm text-pink-400">: <RenderTypeLink typeString={field.type} schema={schema} /></span>
             {field.directives && field.directives.length > 0 && (
              <div className="inline-block ml-2">
                {field.directives.map(dir => (
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
          {field.description && <p className="text-sm text-muted-foreground">{field.description}</p>}
          {field.defaultValue !== null && field.defaultValue !== undefined && (
            <p className="text-sm text-gray-400 mt-1">Default: <code className="text-xs bg-neutral-700 p-0.5 rounded">{String(field.defaultValue)}</code></p>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const renderEnumValuesSection = (values: SchemaEnumValue[]) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-4 text-foreground">Values</h3>
    <ul className="space-y-3">
      {values.map(value => (
        <li key={value.name} className="border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
          <div className="flex items-center mb-1">
            <span className="font-mono text-lg text-foreground">{value.name}</span>
            {value.isDeprecated && <Badge variant="destructive" className="ml-2 text-xs">DEPRECATED</Badge>}
             {value.directives && value.directives.length > 0 && (
              <div className="inline-block ml-2">
                {value.directives.map(dir => (
                  <Badge key={dir.name} variant="outline" className="mr-1 text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                    @{dir.name}
                    {Object.keys(dir.args).length > 0 && (
                      <span>({Object.entries(dir.args).map(([key, val]) => `${key}: ${JSON.stringify(val)}`).join(', ')})</span>
                    )}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {value.deprecationReason && <p className="text-sm text-yellow-500 italic mb-1">Deprecated: {value.deprecationReason}</p>}
          {value.description && <p className="text-sm text-muted-foreground">{value.description}</p>}
        </li>
      ))}
    </ul>
  </div>
);

const renderScalarInfoSection = (scalar: ScalarTypeInfo) => (
  <div className="mt-6">
    {scalar.specifiedByUrl && (
      <p className="text-sm text-muted-foreground">
        Specified by: <a href={scalar.specifiedByUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {scalar.specifiedByUrl} <ExternalLink size={12} className="inline-block ml-1" />
        </a>
      </p>
    )}
    {scalar.directives && scalar.directives.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Directives</h3>
          <div className="flex flex-wrap gap-2">
            {scalar.directives.map(dir => (
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
  </div>
);

const renderInterfaceInfoSection = (iface: InterfaceTypeInfo, schema: ParsedSchema) => (
  <div className="mt-8">
    {iface.interfaces && iface.interfaces.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">Implements Interfaces</h3>
        <div className="flex flex-wrap gap-2">
          {iface.interfaces.map(intName => (
            <Link key={intName} href={getTypePath(intName, schema)} className="hover:underline">
              <Badge variant="secondary">{intName}</Badge>
            </Link>
          ))}
        </div>
      </div>
    )}
    {iface.possibleTypes && iface.possibleTypes.length > 0 && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">Implemented By</h3>
        <div className="flex flex-wrap gap-2">
          {iface.possibleTypes.map(typeName => (
            <Link key={typeName} href={getTypePath(typeName, schema)} className="hover:underline">
              <Badge variant="secondary">{typeName}</Badge>
            </Link>
          ))}
        </div>
      </div>
    )}
    {renderFieldsSection(iface.fields, 'interfaces', iface.name, schema)}
  </div>
);

const renderUnionInfoSection = (union: UnionTypeInfo, schema: ParsedSchema) => (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold mb-4 text-foreground">Possible Types</h3>
    <div className="flex flex-wrap gap-2">
      {union.possibleTypes.map(typeName => (
        <Link key={typeName} href={getTypePath(typeName, schema)} className="hover:underline">
          <Badge variant="secondary">{typeName}</Badge>
        </Link>
      ))}
    </div>
  </div>
);


export default async function DocPage({ params }: PageProps) {
  const schema = loadAndParseSchema('src/schema/schema.graphql');
  const { type: itemTypeRoute, name: itemNameEncoded } = params;
  const itemName = decodeURIComponent(itemNameEncoded);

  let item: ObjectTypeInfo | InputObjectTypeInfo | EnumTypeInfo | ScalarTypeInfo | InterfaceTypeInfo | UnionTypeInfo | null | undefined = null;
  let pageTitle = itemName;
  let itemDescription = "";
  let itemCategoryLabel = ""; 
  let itemDirectives: DirectiveInfo[] | undefined = [];


  switch (itemTypeRoute) {
    case 'query':
      item = schema.queryType;
      pageTitle = schema.queryType?.name || "Query";
      itemDescription = schema.queryType?.description || "The root query type defines the entry points for reading data.";
      itemCategoryLabel = "Query Type";
      itemDirectives = schema.queryType?.directives;
      break;
    case 'mutation':
      item = schema.mutationType;
      pageTitle = schema.mutationType?.name || "Mutation";
      itemDescription = schema.mutationType?.description || "The root mutation type defines the entry points for modifying data.";
      itemCategoryLabel = "Mutation Type";
      itemDirectives = schema.mutationType?.directives;
      break;
    case 'subscription':
      item = schema.subscriptionType;
      pageTitle = schema.subscriptionType?.name || "Subscription";
      itemDescription = schema.subscriptionType?.description || "The root subscription type defines entry points for real-time data updates.";
      itemCategoryLabel = "Subscription Type";
      itemDirectives = schema.subscriptionType?.directives;
      break;
    case 'types':
      item = schema.objectTypes.find(t => t.name === itemName);
      itemCategoryLabel = "Object Type";
      if (item) {
        pageTitle = item.name;
        itemDescription = item.description || "";
        itemDirectives = item.directives;
      }
      break;
    case 'inputs':
      item = schema.inputObjectTypes.find(t => t.name === itemName);
      itemCategoryLabel = "Input Object Type";
      if (item) {
        pageTitle = item.name;
        itemDescription = item.description || "";
        itemDirectives = item.directives;
      }
      break;
    case 'enums':
      item = schema.enumTypes.find(t => t.name === itemName);
      itemCategoryLabel = "Enum Type";
       if (item) {
        pageTitle = item.name;
        itemDescription = item.description || "";
        itemDirectives = item.directives;
      }
      break;
    case 'scalars':
      item = schema.scalarTypes.find(t => t.name === itemName);
      itemCategoryLabel = "Scalar Type";
       if (item) {
        pageTitle = item.name;
        itemDescription = item.description || "";
        itemDirectives = item.directives;
      }
      break;
    case 'interfaces':
      item = schema.interfaceTypes.find(t => t.name === itemName);
      itemCategoryLabel = "Interface Type";
      if (item) {
        pageTitle = item.name;
        itemDescription = item.description || "";
        itemDirectives = item.directives;
      }
      break;
    case 'unions':
      item = schema.unionTypes.find(t => t.name === itemName);
      itemCategoryLabel = "Union Type";
      if (item) {
        pageTitle = item.name;
        itemDescription = item.description || "";
        itemDirectives = item.directives;
      }
      break;
    default:
      notFound();
  }

  if (!item) {
    notFound();
  }

  const signature = generateTypeSignature(item, itemTypeRoute);

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none 
                       prose-headings:text-foreground prose-headings:font-semibold 
                       prose-p:text-muted-foreground 
                       prose-a:text-blue-400 hover:prose-a:text-blue-300 
                       prose-strong:text-foreground 
                       prose-code:text-pink-400 prose-code:before:content-none prose-code:after:content-none 
                       prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
                       prose-hr:border-border/40">
      <div className="mb-6">
        <p className="text-sm text-blue-400 font-semibold mb-1">{itemCategoryLabel}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">{pageTitle}</h1>
        {itemDescription && <p className="text-lg text-muted-foreground">{itemDescription}</p>}
        {itemDirectives && itemDirectives.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {itemDirectives.map(dir => (
              <Badge key={dir.name} variant="secondary" className="text-xs">
                @{dir.name}
                {Object.keys(dir.args).length > 0 && (
                  <span>({Object.entries(dir.args).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')})</span>
                )}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <Separator className="my-8" />

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">GraphQL Definition</h2>
      <CodeBlock code={signature} language="graphql" />

      {(itemTypeRoute === 'query' || itemTypeRoute === 'mutation' || itemTypeRoute === 'subscription' || itemTypeRoute === 'types') && (item as ObjectTypeInfo).fields && (item as ObjectTypeInfo).fields.length > 0 &&
        renderFieldsSection((item as ObjectTypeInfo).fields, itemTypeRoute, itemName, schema)
      }
      {itemTypeRoute === 'interfaces' && (item as InterfaceTypeInfo).fields && (item as InterfaceTypeInfo).fields.length > 0 &&
        renderInterfaceInfoSection((item as InterfaceTypeInfo), schema)
      }
      {itemTypeRoute === 'inputs' && (item as InputObjectTypeInfo).fields && (item as InputObjectTypeInfo).fields.length > 0 &&
        renderInputFieldsSection((item as InputObjectTypeInfo).fields, schema)
      }
      {itemTypeRoute === 'enums' && (item as EnumTypeInfo).values && (item as EnumTypeInfo).values.length > 0 &&
        renderEnumValuesSection((item as EnumTypeInfo).values)
      }
      {itemTypeRoute === 'scalars' && (item as ScalarTypeInfo) &&
        renderScalarInfoSection(item as ScalarTypeInfo)
      }
      {itemTypeRoute === 'unions' && (item as UnionTypeInfo).possibleTypes && (item as UnionTypeInfo).possibleTypes.length > 0 &&
        renderUnionInfoSection(item as UnionTypeInfo, schema)
      }
    </article>
  );
}

export async function generateStaticParams() {
  const schema = loadAndParseSchema('src/schema/schema.graphql');
  const paths: { type: string; name: string }[] = [];

  if (schema.queryType) {
    paths.push({ type: 'query', name: schema.queryType.name });
  }
  if (schema.mutationType) {
    paths.push({ type: 'mutation', name: schema.mutationType.name });
  }
  if (schema.subscriptionType) {
    paths.push({ type: 'subscription', name: schema.subscriptionType.name });
  }
  
  schema.objectTypes.forEach(obj => paths.push({ type: 'types', name: obj.name }));
  schema.inputObjectTypes.forEach(obj => paths.push({ type: 'inputs', name: obj.name }));
  schema.enumTypes.forEach(obj => paths.push({ type: 'enums', name: obj.name }));
  schema.scalarTypes.forEach(obj => paths.push({ type: 'scalars', name: obj.name }));
  schema.interfaceTypes.forEach(obj => paths.push({ type: 'interfaces', name: obj.name }));
  schema.unionTypes.forEach(obj => paths.push({ type: 'unions', name: obj.name }));
  
  return paths.map(p => ({ type: p.type, name: encodeURIComponent(p.name) }));
}
