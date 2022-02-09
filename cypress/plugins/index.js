/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-var-requires */

const injectWebpackDevServer = require('@cypress/react/plugins/load-webpack')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  injectWebpackDevServer(on, config, {
    webpackFilename: 'scripts/config/webpack.cypress.ts',
  })

  return config
}
