import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    ...pluginVue.configs['flat/essential'],
    {
        name: 'jhaas-vuejs-rules',
        files: ["src/**/*.ts", "src/**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
        rules: {
            "eol-last": ["error", "always"],
            quotes: ["error", "single"],
            semi: ["error", "always"],

            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "(next|res|req)",
                varsIgnorePattern: "(next|res|req)",
            }],

            "@typescript-eslint/no-unused-expressions": ["error", {
                allowShortCircuit: true,
                allowTernary: true
            }],

            "@typescript-eslint/no-invalid-void-type": "off",

            indent: ["error", 2, {
                ignoredNodes: [
                    "FunctionExpression > .params[decorators.length > 0]",
                    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                    "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
                ],

                SwitchCase: 1,
                flatTernaryExpressions: true,
            }]
        }
    }
);
