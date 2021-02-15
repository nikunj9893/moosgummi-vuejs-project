module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ], 
  plugins: [
    "transform-regenerator",
    "@babel/transform-runtime"
  ],
}