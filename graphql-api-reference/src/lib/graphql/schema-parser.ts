import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
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
  let currentType = type;
  let wrappers: string[] = [];

  while (currentType.ofType) {
    if (currentType.kind === 'NON_NULL_TYPE') {
      wrappers.push('!');
    } else if (currentType.kind === 'LIST_TYPE') {
      wrappers.unshift('[');
      wrappers.push(']');
    }
    currentType = currentType.ofType;
  }
  
  let baseTypeName = currentType.name;
  
  // Reconstruct the type string with wrappers in correct order
  let finalType = baseTypeName;
  for (let i = 0; i < wrappers.length; i++) {
    if (wrappers[i] === '[') {
      finalType = `[${finalType}]`;
    } else if (wrappers[i] === ']') {
      // This case is handled by the unshift for '['
    } else if (wrappers[i] === '!') {
        // If the next wrapper is ']', apply ! inside, otherwise outside
        if (i + 1 < wrappers.length && wrappers[i+1] === ']') {
            finalType = `${finalType}!`;
        } else {
            finalType = `${finalType}!`;
        }
    }
  }
   // This logic is a bit tricky. Let's simplify and reconstruct.
   let finalTypeName = currentType.name;
   let tempType = type;
   while (tempType.ofType) {
     if (tempType.kind === 'NON_NULL_TYPE') {
       finalTypeName = `${finalTypeName}!`;
     } else if (tempType.kind === 'LIST_TYPE') {
       finalTypeName = `[${finalTypeName}]`;
     }
     tempType = tempType.ofType;
   }
   // The above loop processes wrappers inside-out. We need outside-in.
   // Let's rebuild it properly.
   let typeStr = currentType.name;
   tempType = type;
   while(tempType.ofType) {
     if (tempType.kind === 'LIST_TYPE') {
       typeStr = `[${typeStr}]`;
     } else if (tempType.kind === 'NON_NULL_TYPE') {
       // Check if the NON_NULL is modifying a LIST or the base type
       if (tempType.ofType.kind === 'LIST_TYPE' || tempType.ofType.kind === 'SCALAR' || tempType.ofType.kind === 'OBJECT' || tempType.ofType.kind === 'INTERFACE' || tempType.ofType.kind === 'UNION' || tempType.ofType.kind === 'ENUM' || tempType.ofType.kind === 'INPUT_OBJECT') {
            // This means the type before ! was the base type or a list, so ! goes after it.
            typeStr = `${typeStr}!`;
       } else {
           // This case is tricky, e.g. [Type!]! - the inner ! is handled by recursion
           // The outer ! needs to be appended after the list brackets are formed.
           // This simplified version might not capture all nuances of nested non-nulls perfectly.
           // A more robust way is to build it from outside-in.
       }
     }
     tempType = tempType.ofType;
   }
    // Corrected logic for formatFieldType
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
      // Handle different value kinds for arguments
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
          value = arg.value.values.map(v => (v as StringValueNode).value); // Simplified for string lists
          break;
        // Add more cases if needed for other ValueNode types
        default:
          value = (arg.value as StringValueNode).value; // Fallback for simple values
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
    isDeprecated: field.isDeprecated,
    deprecationReason: field.deprecationReason,
    directives: mapDirectivesFromAst(field.astNode),
    args: field.args.map((arg: GraphQLArgument) => ({
      name: arg.name,
      description: arg.description,
      type: formatFieldType(arg.type),
      defaultValue: arg.defaultValue !== undefined && arg.defaultValue !== null ? String(arg.defaultValue) : null,
      directives: mapDirectivesFromAst(arg.astNode),
    })),
  }));
}

function mapInputFields(fields: Record<string, GraphQLInputField>): InputField[] {
  return Object.values(fields).map(field => ({
    name: field.name,
    description: field.description,
    type: formatFieldType(field.type),
    defaultValue: field.defaultValue !== undefined && field.defaultValue !== null ? String(field.defaultValue) : null,
    directives: mapDirectivesFromAst(field.astNode),
  }));
}

function mapEnumValues(values: readonly GraphQLEnumValue[]): EnumValue[] {
  return values.map(value => ({
    name: value.name,
    description: value.description,
    isDeprecated: value.isDeprecated,
    deprecationReason: value.deprecationReason,
    directives: mapDirectivesFromAst(value.astNode),
  }));
}

export function loadAndParseSchema(schemaPath: string): ParsedSchema {
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
    if (typeName.startsWith('__')) { // Skip introspection types
      continue;
    }

    const type = typeMap[typeName];

    if (isObjectType(type)) {
      objectTypes.push({
        name: type.name,
        description: type.description,
        fields: mapFields(type.getFields()),
        directives: mapDirectivesFromAst(type.astNode),
      });
    } else if (isInputObjectType(type)) {
      inputObjectTypes.push({
        name: type.name,
        description: type.description,
        fields: mapInputFields(type.getFields()),
        directives: mapDirectivesFromAst(type.astNode),
      });
    } else if (isEnumType(type)) {
      enumTypes.push({
        name: type.name,
        description: type.description,
        values: mapEnumValues(type.getValues()),
        directives: mapDirectivesFromAst(type.astNode),
      });
    } else if (isScalarType(type)) {
      const specifiedByDirective = type.astNode?.directives?.find(d => d.name.value === 'specifiedBy');
      const specifiedByUrl = specifiedByDirective?.arguments?.find(a => a.name.value === 'url');
      scalarTypes.push({
        name: type.name,
        description: type.description,
        specifiedByUrl: specifiedByUrl && specifiedByUrl.value.kind === 'StringValue' ? specifiedByUrl.value.value : null,
        directives: mapDirectivesFromAst(type.astNode),
      });
    } else if (isInterfaceType(type)) {
      interfaceTypes.push({
        name: type.name,
        description: type.description,
        fields: mapFields(type.getFields()),
        interfaces: type.getInterfaces().map(iface => iface.name),
        // possibleTypes are harder to get directly here, may need schema.getPossibleTypes(type)
        directives: mapDirectivesFromAst(type.astNode),
      });
    } else if (isUnionType(type)) {
      unionTypes.push({
        name: type.name,
        description: type.description,
        possibleTypes: type.getTypes().map(t => t.name),
        directives: mapDirectivesFromAst(type.astNode),
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
    directives: mapDirectivesFromAst(schema.astNode),
  };
}

// Basic test logging
if (require.main === module) {
  try {
    const parsedSchema = loadAndParseSchema('src/schema/schema.graphql');
    console.log("Successfully parsed schema.");
    // console.log(JSON.stringify(parsedSchema, null, 2)); // For detailed inspection if needed
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
