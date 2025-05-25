import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema/schema.graphql",
  documents: undefined, // Explicitly set to undefined as we only want schema types for now
  generates: {
    "src/lib/graphql/generated/types.ts": { // Output directly to types.ts
      plugins: [
        "typescript", // Generates base TypeScript types
      ],
      config: {
        // Optional: Add configurations for the typescript plugin if needed
        // e.g., scalars: { DateTime: 'string', UUID: 'string' }
      }
    }
  },
  // If you want to ensure no errors for missing operations:
  ignoreNoDocuments: true, 
};

export default config;
