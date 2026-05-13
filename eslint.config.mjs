import nextConfigVitals from "eslint-config-next/core-web-vitals";
import nextConfigTs from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "tmp/**",
      "next-env.d.ts",
      "public/**",
      "lotusgod_content/**",
      "scripts/**",
    ],
  },
  ...nextConfigVitals,
  ...nextConfigTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
