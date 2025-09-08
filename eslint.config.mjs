import prettierConfig from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**/*", "node_modules/**/*", "coverage/**/*"],
  },
  ...tseslint.config({
    files: ["**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jsdoc,
      import: importPlugin,
    },
    extends: [
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
      prettierConfig,
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      quotes: ["error", "single", { avoidEscape: true }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "error",
      "import/order": [
        "off",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          distinctGroup: true,
          "newlines-between": "always",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "es5",
          printWidth: 80,
          tabWidth: 2,
          semi: true,
          arrowParens: "avoid",
          importOrder: [
            "^@core/(.*)$",
            "^@server/(.*)$",
            "^@ui/(.*)$",
            "^[./]",
          ],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          plugins: ["@trivago/prettier-plugin-sort-imports"],
          importOrderParserPlugins: ["typescript", "decorators-legacy"],
        },
      ],
    },
  }),
];
