{
    "globals" : {
      "Handlebars": true,
      "$": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaVersion": 6
    },
    "env": {
      "browser": true,
      "jquery": true,
      "node": true,
      "es6": true,
      "jest": true
    },
    "rules": {
      "eqeqeq": ["error", "always"],
      "no-template-curly-in-string": "error",
      "no-console": "off",
      "no-undefined": "off",
      "indent": ["error", 2],
      "quotes": ["warn", "single", {"allowTemplateLiterals": true}],
      "no-multi-spaces": ["warn", {"exceptions": { "VariableDeclarator": true }}],
      "no-trailing-spaces": "warn",
      "new-cap": "warn",
      "no-redeclare": ["error", { "builtinGlobals": true }],
      "eol-last": "error"
    }
  }