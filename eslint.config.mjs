export default [
  {
    ignores: ["node_modules/", "dist/"], // Ignore les fichiers inutiles
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        process: "readonly", // Corrige les erreurs sur `process`
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
      }
    },
    plugins: { jest: require("eslint-plugin-jest") }, // Active le plugin Jest
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];
