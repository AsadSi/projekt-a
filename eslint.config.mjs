import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // server.js runs in Node, not the browser, so it gets Node's globals (require, __dirname).
    files: ["server.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
