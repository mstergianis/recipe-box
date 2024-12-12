import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/query",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
