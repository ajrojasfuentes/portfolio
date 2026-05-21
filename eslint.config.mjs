import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx,astro}"],
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/modules",
              from: "./src/modules",
              except: ["./**/*/index.ts"],
              message: "No cross-module imports. Use @/shared-kernel/ instead.",
            },
          ],
        },
      ],
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/img-redundant-alt": "warn",
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "astro/no-set-html-directive": "error",
      "astro/no-unused-define-vars-in-style": "error",
    },
  },
  {
    ignores: ["dist", ".astro", "node_modules", "public"],
  },
];
