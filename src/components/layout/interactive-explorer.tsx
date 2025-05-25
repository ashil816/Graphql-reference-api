"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CodeBlock from '@/components/ui/code-block';
import { SchemaField, SchemaFieldArgument, ParsedSchema, EnumTypeInfo } from '@/lib/graphql/schema-parser'; // Assuming these types are exported

interface InteractiveExplorerProps {
  field: SchemaField;
  parentName: string; // e.g., "Query", "Mutation", "User"
  parentTypeCategory: 'query' | 'mutation' | 'subscription' | 'types' | 'interfaces'; // To determine operation type
  schema: ParsedSchema; // Full schema for looking up enum values, etc.
}

// Mock GraphQL client
const mockGraphQLClient = async (query: string, variables: Record<string, any>, field: SchemaField): Promise<any> => {
  console.log("Executing Query:\n", query);
  console.log("Variables:", variables);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

  // Simple mock responses based on field name
  if (query.includes("getUsers")) {
    return { data: { getUsers: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }] } };
  }
  if (query.includes("getUser")) {
    return { data: { getUser: { id: variables.id || "1", name: "Mock User", email: "mock@example.com" } } };
  }
  if (query.includes("createPost")) {
    return { data: { createPost: { id: "new-post-id", title: variables.title, content: "Mock content" } } };
  }
  return { data: { [field.name]: { message: "Mock response", receivedVariables: variables } } };
};

function buildGraphQLQuery(operationType: 'query' | 'mutation' | 'subscription', operationName: string, field: SchemaField, variables: Record<string, any>, schema: ParsedSchema): string {
  const fieldName = field.name;
  const args = field.args;

  let queryArgs = "";
  if (args.length > 0) {
    const argStrings = args
      .filter(arg => variables[arg.name] !== undefined && variables[arg.name] !== '') // Only include args with values
      .map(arg => `${arg.name}: $${arg.name}`);
    if (argStrings.length > 0) {
      queryArgs = `(${argStrings.join(', ')})`;
    }
  }

  let variableDefinitions = "";
  if (args.length > 0) {
    const varDefStrings = args
      .filter(arg => variables[arg.name] !== undefined && variables[arg.name] !== '')
      .map(arg => `$${arg.name}: ${arg.type}`);
    if (varDefStrings.length > 0) {
      variableDefinitions = `(${varDefStrings.join(', ')})`;
    }
  }
  
  // Basic selection set - ideally, this would be more sophisticated
  let selectionSet = "";
  const returnTypeBase = field.type.replace(/[\[\]!]/g, '');
  const returnObjectType = schema.objectTypes.find(t => t.name === returnTypeBase) || schema.interfaceTypes.find(t => t.name === returnTypeBase);

  if (returnObjectType && returnObjectType.fields.length > 0) {
    selectionSet = ` {\n      ${returnObjectType.fields.slice(0, 3).map(f => f.name).join('\n      ')}\n    }`;
  } else if (schema.scalarTypes.find(s => s.name === returnTypeBase) || schema.enumTypes.find(e => e.name === returnTypeBase)) {
    // No selection set for scalar or enum types
    selectionSet = "";
  } else {
    selectionSet = ` # Add fields for ${returnTypeBase}`;
  }


  return `${operationType} ${operationName}${variableDefinitions} {
  ${fieldName}${queryArgs}${selectionSet}
}`;
}


const InteractiveExplorer: React.FC<InteractiveExplorerProps> = ({ field, parentName, parentTypeCategory, schema }) => {
  const [argValues, setArgValues] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize argValues with default values from schema
    const initialValues: Record<string, any> = {};
    field.args.forEach(arg => {
      if (arg.defaultValue !== null && arg.defaultValue !== undefined) {
        initialValues[arg.name] = arg.defaultValue;
      } else {
        // Provide sensible defaults for common types to avoid undefined issues
        const baseType = arg.type.replace(/[\[\]!]/g, '');
        if (baseType === 'Boolean') {
          initialValues[arg.name] = false;
        } else if (baseType === 'Int' || baseType === 'Float') {
          initialValues[arg.name] = 0;
        } else if (arg.type.endsWith('!')) { // Required non-null basic types
            initialValues[arg.name] = ''; // Or some placeholder
        } else {
            initialValues[arg.name] = ''; // Default for strings or complex types
        }
      }
    });
    setArgValues(initialValues);
  }, [field.args]);

  const handleInputChange = (name: string, value: any) => {
    setArgValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRunQuery = async () => {
    setLoading(true);
    setResponse(null);

    const operationName = `${parentName}${field.name.charAt(0).toUpperCase() + field.name.slice(1)}Example`;
    let operationTypeString: 'query' | 'mutation' | 'subscription' = 'query';
    if (parentTypeCategory === 'mutation') operationTypeString = 'mutation';
    if (parentTypeCategory === 'subscription') operationTypeString = 'subscription';

    const query = buildGraphQLQuery(operationTypeString, operationName, field, argValues, schema);
    
    try {
      const result = await mockGraphQLClient(query, argValues, field);
      setResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      setResponse(JSON.stringify({ error: (err as Error).message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (arg: SchemaFieldArgument) => {
    const baseType = arg.type.replace(/[\[\]!]/g, '');
    const isRequired = arg.type.endsWith('!');

    const enumType = schema.enumTypes.find(e => e.name === baseType);

    if (enumType) {
      return (
        <Select
          value={argValues[arg.name] || ''}
          onValueChange={(value) => handleInputChange(arg.name, value)}
        >
          <SelectTrigger className="w-full bg-input text-foreground">
            <SelectValue placeholder={`Select ${arg.name}`} />
          </SelectTrigger>
          <SelectContent>
            {enumType.values.map(val => (
              <SelectItem key={val.name} value={val.name}>
                {val.name}
                {val.isDeprecated && " (deprecated)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    switch (baseType) {
      case 'Boolean':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={arg.name}
              checked={!!argValues[arg.name]}
              onCheckedChange={(checked) => handleInputChange(arg.name, checked)}
            />
            <label
              htmlFor={arg.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {arg.name}
            </label>
          </div>
        );
      case 'Int':
      case 'Float':
        return (
          <Input
            type="number"
            id={arg.name}
            value={argValues[arg.name] || ''}
            onChange={(e) => handleInputChange(arg.name, e.target.value === '' ? '' : Number(e.target.value))}
            placeholder={`${arg.type}${isRequired ? ' (required)' : ''}`}
            className="bg-input text-foreground"
          />
        );
      case 'String':
      case 'ID':
      case 'DateTime': // Treat as string for input
      case 'UUID': // Treat as string for input
      case 'Long': // Treat as string for input, or number if appropriate
        return (
          <Input
            type="text"
            id={arg.name}
            value={argValues[arg.name] || ''}
            onChange={(e) => handleInputChange(arg.name, e.target.value)}
            placeholder={`${arg.type}${isRequired ? ' (required)' : ''}`}
            className="bg-input text-foreground"
          />
        );
      default:
        // For complex input objects, use a textarea for JSON input
        return (
          <Textarea
            id={arg.name}
            value={typeof argValues[arg.name] === 'object' ? JSON.stringify(argValues[arg.name], null, 2) : argValues[arg.name] || ''}
            onChange={(e) => {
              try {
                handleInputChange(arg.name, JSON.parse(e.target.value));
              } catch (parseError) {
                handleInputChange(arg.name, e.target.value); // Keep as string if not valid JSON
              }
            }}
            placeholder={`JSON for ${arg.type}${isRequired ? ' (required)' : ''}`}
            className="font-mono bg-input text-foreground"
            rows={3}
          />
        );
    }
  };

  return (
    <div className="mt-8 p-6 border border-border rounded-lg bg-card">
      <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Interactive Explorer</h3>
      
      {field.args.length > 0 && (
        <div className="space-y-4 mb-6">
          <h4 className="text-lg font-medium text-card-foreground">Arguments:</h4>
          {field.args.map(arg => (
            <div key={arg.name} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <Label htmlFor={arg.name} className="text-sm font-medium text-muted-foreground md:text-right">
                {arg.name}
                {arg.type.endsWith('!') ? <span className="text-red-500">*</span> : ''}
                <br />
                <span className="text-xs text-gray-500">({arg.type})</span>
              </Label>
              <div className="md:col-span-2">
                {renderInputField(arg)}
                {arg.description && <p className="text-xs text-muted-foreground mt-1">{arg.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {field.args.length === 0 && (
        <p className="text-muted-foreground mb-6">This operation takes no arguments.</p>
      )}

      <Button onClick={handleRunQuery} disabled={loading}>
        {loading ? 'Running...' : 'Run Query'}
      </Button>

      {response && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-card-foreground mb-2">Response:</h4>
          <CodeBlock code={response} language="json" />
        </div>
      )}
    </div>
  );
};

export default InteractiveExplorer;
