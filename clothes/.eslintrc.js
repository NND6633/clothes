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
    // tắt rule global nếu muốn
    // "@typescript-eslint/no-require-imports": "off",
  },
  overrides: [
    {
      // tắt rule riêng cho Prisma generated code
      files: ["**/node_modules/.prisma/client/**"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
};
