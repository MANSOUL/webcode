module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    // 'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ], //定义文件继承的子规范
  plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
  env: { //指定代码的运行环境
    browser: true,
    node: true,
  },
  settings: { //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: "React",
      version: "detect"
    },
    "import/resolver": {
      alias: {
        map: [
          ['@src/', './src/']
        ]
      }
    }
  },
  parserOptions: { //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {

  }
}