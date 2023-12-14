module.exports = {
    extends: '@antfu',
    rules: {
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true,
            },
        ],
        // 'linebreak-style': [0, 'off', 'windows'],
        'import/order': ['error', { 'newlines-between': 'always-and-inside-groups' }], // 修复import 排序问题
        'no-empty-function': 'off',
        'no-undefined': 'off',
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        'jsonc/indent': ['error', 4, {}],
        'vue/html-indent': ['error', 4, { baseIndent: 1, alignAttributesVertically: false }],
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'beside',
                multiline: 'ignore',
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never',
            },
        ],
        '@typescript-eslint/semi': 'error',
        'curly': ['error', 'multi'], // 对所有控制语句强制执行一致的大括号样式 -  该规则与 max-statements-per-line 默认规则产生冲突
    },
}
