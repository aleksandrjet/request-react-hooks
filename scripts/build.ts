import webpack, { Compiler, Stats } from 'webpack'
import chalk from 'chalk'

import { webpackLibrary as getProdConfig } from './config/webpack.library'

const compiler: Compiler = webpack(getProdConfig())

compiler.hooks.beforeRun.tap({ name: 'start' }, () => {
  console.log('Compilation started')
})

compiler.hooks.done.tap({ name: 'done' }, () => {
  console.log('Compilation completed')
})

compiler.run((error, stats: Stats) => {
  if (error) {
    console.error(error.stack || error)
    error.message && console.error(error.message)

    return null
  }

  console.group(chalk.greenBright('Build info:'))
  console.log('hash: ', stats.toJson().hash)
  console.log('version: ', stats.toJson().version)
  console.log('env: ', stats.toJson().env)
  console.groupEnd()

  const info = stats.toString({
    colors: true,
    modules: false,
  })
  console.log(info)

  if (stats.hasErrors()) {
    console.log(chalk.redBright('Error'))
    console.log(stats.compilation.errors)
  }

  if (stats.hasWarnings()) {
    console.log(chalk.yellowBright('Warning'))
    console.log(stats.compilation.warnings)
  }
})
