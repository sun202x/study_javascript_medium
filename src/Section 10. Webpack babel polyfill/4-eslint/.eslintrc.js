module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    // 설정을 끄고 싶다면 아래에 끄고 싶은 설정을 입력해 준다.
    'require-jsdoc': 0,
  },
};
