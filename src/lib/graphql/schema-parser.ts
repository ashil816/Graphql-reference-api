// import { loadSchemaSync } from '@graphql-tools/load'; // Original
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'; // Original
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  isObjectType,
  isInputObjectType,
  isEnumType,
  isScalarType,
  isInterfaceType,
  isUnionType,
  GraphQLField,
  GraphQLInputField,
  GraphQLEnumValue,
  GraphQLArgument,
  GraphQLDirective,
  ConstDirectiveNode,
  StringValueNode,
  ValueNode,
} from 'graphql';

const IS_SERVER = typeof window === 'undefined';

// Define interfaces for our structured schema data
interface DirectiveInfo {
  name: string;
  args: { [key: string]: any };
}

interface FieldArgument {
  name: string;
  description?: string | null;
  type: string;
  defaultValue?: string | null;
  directives?: DirectiveInfo[];
}

interface Field {
  name: string;
  description?: string | null;
  type: string;
  args: FieldArgument[];
  isDeprecated: boolean;
  deprecationReason?: string | null;
  directives?: DirectiveInfo[];
}

interface InputField {
  name: string;
  description?: string | null;
  type: string;
  defaultValue?: string | null;
  directives?: DirectiveInfo[];
}

interface EnumValue {
  name: string;
  description?: string | null;
  isDeprecated: boolean;
  deprecationReason?: string | null;
  directives?: DirectiveInfo[];
}

interface ObjectTypeInfo {
  name: string;
  description?: string | null;
  fields: Field[];
  directives?: DirectiveInfo[];
  interfaces?: string[]; // Added to support interfaces implemented by object types
}

interface InputObjectTypeInfo {
  name: string;
  description?: string | null;
  fields: InputField[];
  directives?: DirectiveInfo[];
}

interface EnumTypeInfo {
  name: string;
  description?: string | null;
  values: EnumValue[];
  directives?: DirectiveInfo[];
}

interface ScalarTypeInfo {
  name: string;
  description?: string | null;
  specifiedByUrl?: string | null; // For @specifiedBy directive
  directives?: DirectiveInfo[];
}

interface InterfaceTypeInfo {
  name: string;
  description?: string | null;
  fields: Field[];
  interfaces?: string[]; // Names of interfaces it implements
  possibleTypes?: string[]; // Names of types that implement this interface
  directives?: DirectiveInfo[];
}

interface UnionTypeInfo {
  name: string;
  description?: string | null;
  possibleTypes: string[]; // Names of possible types
  directives?: DirectiveInfo[];
}


interface ParsedSchema {
  queryType?: ObjectTypeInfo | null;
  mutationType?: ObjectTypeInfo | null;
  subscriptionType?: ObjectTypeInfo | null;
  objectTypes: ObjectTypeInfo[];
  inputObjectTypes: InputObjectTypeInfo[];
  enumTypes: EnumTypeInfo[];
  scalarTypes: ScalarTypeInfo[];
  interfaceTypes: InterfaceTypeInfo[];
  unionTypes: UnionTypeInfo[];
  directives?: DirectiveInfo[]; // Schema directives
}

function formatFieldType(type: any): string {
    let innerType = type;
    const wrappersStack: string[] = [];
    while (innerType.ofType) {
        if (innerType.kind === 'NON_NULL_TYPE') {
            wrappersStack.push('!');
        } else if (innerType.kind === 'LIST_TYPE') {
            wrappersStack.push('[]');
        }
        innerType = innerType.ofType;
    }
    let finalString = innerType.name;
    while (wrappersStack.length > 0) {
        const wrapper = wrappersStack.pop();
        if (wrapper === '!') {
            finalString = `${finalString}!`;
        } else if (wrapper === '[]') {
            finalString = `[${finalString}]`;
        }
    }
    return finalString;
}

function mapDirectivesFromAst(astNode?: { directives?: readonly ConstDirectiveNode[] }): DirectiveInfo[] {
  if (!astNode || !astNode.directives) {
    return [];
  }
  return astNode.directives.map((dir: ConstDirectiveNode) => ({
    name: dir.name.value,
    args: (dir.arguments || []).reduce((obj: any, arg) => {
      let value: any;
      switch (arg.value.kind) {
        case 'IntValue':
        case 'FloatValue':
          value = parseFloat(arg.value.value);
          break;
        case 'StringValue':
          value = arg.value.value;
          break;
        case 'BooleanValue':
          value = arg.value.value;
          break;
        case 'EnumValue':
          value = arg.value.value;
          break;
        case 'ListValue':
          value = arg.value.values.map(v => (v as StringValueNode).value); 
          break;
        default:
          value = (arg.value as StringValueNode).value; 
      }
      obj[arg.name.value] = value;
      return obj;
    }, {}),
  }));
}

function mapFields(fields: Record<string, GraphQLField<any, any>>): Field[] {
  return Object.values(fields).map(field => ({
    name: field.name,
    description: field.description,
    type: formatFieldType(field.type),
    // TODO: Investigate why TypeScript doesn't recognize 'isDeprecated'/'deprecationReason' from 'graphql' package.
    isDeprecated: (field as any).isDeprecated,
    deprecationReason: (field as any).deprecationReason,
    directives: mapDirectivesFromAst(field.astNode || undefined),
    args: field.args.map((arg: GraphQLArgument) => ({
      name: arg.name,
      description: arg.description,
      type: formatFieldType(arg.type),
      defaultValue: arg.defaultValue !== undefined && arg.defaultValue !== null ? String(arg.defaultValue) : null,
      directives: mapDirectivesFromAst(arg.astNode || undefined),
    })),
  }));
}

function mapInputFields(fields: Record<string, GraphQLInputField>): InputField[] {
  return Object.values(fields).map(field => ({
    name: field.name,
    description: field.description,
    type: formatFieldType(field.type),
    defaultValue: field.defaultValue !== undefined && field.defaultValue !== null ? String(field.defaultValue) : null,
    directives: mapDirectivesFromAst(field.astNode || undefined),
  }));
}

function mapEnumValues(values: readonly GraphQLEnumValue[]): EnumValue[] {
  return values.map(value => ({
    name: value.name,
    description: value.description,
    // TODO: Investigate why TypeScript doesn't recognize 'isDeprecated'/'deprecationReason' from 'graphql' package.
    isDeprecated: (value as any).isDeprecated,
    deprecationReason: (value as any).deprecationReason,
    directives: mapDirectivesFromAst(value.astNode || undefined),
  }));
}

export function loadAndParseSchema(schemaPath: string): ParsedSchema {
  if (!IS_SERVER) {
    console.warn("loadAndParseSchema called on client-side. Returning empty schema structure.");
    return {
      queryType: null,
      mutationType: null,
      subscriptionType: null,
      objectTypes: [],
      inputObjectTypes: [],
      enumTypes: [],
      scalarTypes: [],
      interfaceTypes: [],
      unionTypes: [],
      directives: [],
    };
  }

  // Dynamically require server-only modules only on the server
  const { loadSchemaSync } = eval('require')('@graphql-tools/load');
  const { GraphQLFileLoader } = eval('require')('@graphql-tools/graphql-file-loader');

  const schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()],
  });

  const queryTypeName = schema.getQueryType()?.name;
  const mutationTypeName = schema.getMutationType()?.name;
  const subscriptionTypeName = schema.getSubscriptionType()?.name;

  const objectTypes: ObjectTypeInfo[] = [];
  const inputObjectTypes: InputObjectTypeInfo[] = [];
  const enumTypes: EnumTypeInfo[] = [];
  const scalarTypes: ScalarTypeInfo[] = [];
  const interfaceTypes: InterfaceTypeInfo[] = [];
  const unionTypes: UnionTypeInfo[] = [];

  const typeMap = schema.getTypeMap();

  for (const typeName in typeMap) {
    if (typeName.startsWith('__')) { 
      continue;
    }

    const type = typeMap[typeName];

    if (isObjectType(type)) {
      objectTypes.push({
        name: type.name,
        description: type.description,
        fields: mapFields(type.getFields()),
        directives: mapDirectivesFromAst(type.astNode || undefined),
        interfaces: type.getInterfaces().map(iface => iface.name), // Added
      });
    } else if (isInputObjectType(type)) {
      inputObjectTypes.push({
        name: type.name,
        description: type.description,
        fields: mapInputFields(type.getFields()),
        directives: mapDirectivesFromAst(type.astNode || undefined),
      });
    } else if (isEnumType(type)) {
      enumTypes.push({
        name: type.name,
        description: type.description,
        values: mapEnumValues(type.getValues()),
        directives: mapDirectivesFromAst(type.astNode || undefined),
      });
    } else if (isScalarType(type)) {
      const specifiedByDirective = type.astNode?.directives?.find(d => d.name.value === 'specifiedBy');
      const specifiedByUrl = specifiedByDirective?.arguments?.find(a => a.name.value === 'url');
      scalarTypes.push({
        name: type.name,
        description: type.description,
        specifiedByUrl: specifiedByUrl && specifiedByUrl.value.kind === 'StringValue' ? specifiedByUrl.value.value : null,
        directives: mapDirectivesFromAst(type.astNode || undefined),
      });
    } else if (isInterfaceType(type)) {
      interfaceTypes.push({
        name: type.name,
        description: type.description,
        fields: mapFields(type.getFields()),
        interfaces: type.getInterfaces().map(iface => iface.name),
        directives: mapDirectivesFromAst(type.astNode || undefined),
      });
    } else if (isUnionType(type)) {
      unionTypes.push({
        name: type.name,
        description: type.description,
        possibleTypes: type.getTypes().map(t => t.name),
        directives: mapDirectivesFromAst(type.astNode || undefined),
      });
    }
  }
  
  const getObjectTypeByName = (name?: string): ObjectTypeInfo | null => {
    if (!name) return null;
    return objectTypes.find(t => t.name === name) || null;
  }

  return {
    queryType: getObjectTypeByName(queryTypeName),
    mutationType: getObjectTypeByName(mutationTypeName),
    subscriptionType: getObjectTypeByName(subscriptionTypeName),
    objectTypes: objectTypes.filter(t => t.name !== queryTypeName && t.name !== mutationTypeName && t.name !== subscriptionTypeName),
    inputObjectTypes,
    enumTypes,
    scalarTypes,
    interfaceTypes,
    unionTypes,
    directives: mapDirectivesFromAst(schema.astNode || undefined),
  };
}

if (IS_SERVER && require.main === module) {
  try {
    const parsedSchema = loadAndParseSchema('src/schema/schema.graphql');
    console.log("Successfully parsed schema.");
    console.log("Query Type:", parsedSchema.queryType?.name);
    if (parsedSchema.queryType?.fields[0]) {
      console.log("First query field directives:", parsedSchema.queryType.fields[0].directives);
      if (parsedSchema.queryType.fields[0].args.length > 0) {
        console.log("First arg of first query field directives:", parsedSchema.queryType.fields[0].args[0].directives);
      }
    }
    console.log("Mutation Type:", parsedSchema.mutationType?.name);
    console.log("Object Types Count:", parsedSchema.objectTypes.length);
    if (parsedSchema.objectTypes.length > 0) {
        const machineType = parsedSchema.objectTypes.find(t => t.name === "Machine");
        if (machineType) {
            console.log("\nMachine Type Directives:", machineType.directives);
            const serialField = machineType.fields.find(f => f.name === "serialNumber");
            if (serialField) {
                console.log("Machine.serialNumber directives:", serialField.directives);
            }
        }
    }
    console.log("Scalar Types:", parsedSchema.scalarTypes.map(s => ({ name: s.name, description: s.description, specifiedByUrl: s.specifiedByUrl })));

  } catch (error) {
    console.error("Error parsing schema:", error);
  }
}

export type { ParsedSchema, ObjectTypeInfo, InputObjectTypeInfo, EnumTypeInfo, ScalarTypeInfo, Field as SchemaField, InputField as SchemaInputField, EnumValue as SchemaEnumValue, FieldArgument as SchemaFieldArgument, DirectiveInfo, InterfaceTypeInfo, UnionTypeInfo };
