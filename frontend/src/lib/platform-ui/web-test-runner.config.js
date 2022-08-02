const { esbuildPlugin } = require('@web/dev-server-esbuild')

module.exports = {
  nodeResolve: true,
  files: ['libs/platform-ui/**/*.test.ts'],
  plugins: [
    esbuildPlugin({
      ts: true
    })
  ]
}
