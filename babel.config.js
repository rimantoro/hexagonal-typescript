module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    // '@shelf/jest-mongodb'
  ],
  plugins: [
    "transform-class-properties",
    "syntax-class-properties"
  ]
};