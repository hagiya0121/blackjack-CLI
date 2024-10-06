import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2022,
    },
  },
  pluginJs.configs.recommended,
];
