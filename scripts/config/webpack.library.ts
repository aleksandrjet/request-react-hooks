import Webpack from 'webpack'
import webpackMerge from 'webpack-merge'

import { config as commonConfig } from './webpack.common'
import {
  excludePeerDependencies,
  webpackAnalyze,
  webpackBar,
  webpackCleanDirectory,
  webpackLibraryName,
} from '../modules/buildUtils'
import { BUILD_DIRECTORY, SOURCE_DIRECTORY } from '../constants'

export const webpackLibrary: () => Webpack.Configuration = () => {
  return webpackMerge(
    commonConfig(),
    {
      mode: 'production',
      devtool: false,
      entry: [`${SOURCE_DIRECTORY}/index.ts`],
      output: { path: BUILD_DIRECTORY, filename: 'index.js', publicPath: '/' },
    },
    webpackLibraryName(),
    excludePeerDependencies(),
    webpackBar(),
    webpackAnalyze(),
    webpackCleanDirectory(),
  )
}
