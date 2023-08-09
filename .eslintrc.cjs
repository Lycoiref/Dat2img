/** .eslintrc.js
 * 在VSCode中安装ESLint插件，编写过程中检测代码质量
 * ESLint 代码质量校验相关配置
 * 这里使用prettier作为代码格式化工具，用ESLint做代码质检
 * 相关配置使用下面extends扩展先做默认设置
 * 在.prettierrc.js文件中配置好后，格式化规则会以.prettierrc.js作为最终格式，所以不建议在本文件中做代码格式化相关配置
 * 相关prettier配置ESLint会默认加载为代码质检 格式化以prettier为主
 * 在本配置文件中只做代码质量约束规范配置
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint-config-prettier',
        'eslint:recommended', // 使用推荐的eslint
        // 'airbnb',
        'plugin:vue/vue3-recommended', // 使用插件支持vue3
        'plugin:vue/vue3-essential',
        //1.继承.prettierrc.js文件规则2.开启rules的 "prettier/prettier": "error"3.eslint fix的同时执行prettier格式化
        'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        // parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-unused-vars': 2,
        'no-undef': 2,
    },
    plugins: ['vue', 'html'],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
}
