module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Các rule chung của project
  },
  overrides: [
    {
      // Tắt rule require() cho Prisma client
      files: ["src/prisma/**"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
};
