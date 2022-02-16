module.exports = (api) => {
  const env = api.env()
  api.cache.never()

  const plugins = []

  console.log('babel rc', env)

  if (env === 'test') {
    plugins.push('istanbul')
  }

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          debug: false,
          spec: true,
          loose: false,
          modules: false,
        },
      ],
    ],
    plugins,
  }
}
