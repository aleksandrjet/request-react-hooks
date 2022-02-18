import Webpack from 'webpack'
import webpackMerge from 'webpack-merge'

import {
  excludePeerDependencies,
  webpackAnalyze,
  webpackBar,
  webpackCleanDirectory,
} from '../modules/buildUtils'
import { loadTs } from '../modules/loadTs'
import { BUILD_DIRECTORY, EXTENSIONS, SOURCE_DIRECTORY } from '../constants'
import packageJson from '../../package.json'

export const webpackLibrary: () => Webpack.Configuration = () => {
  return webpackMerge(
    {
      mode: 'production',
      devtool: false,
      entry: [`${SOURCE_DIRECTORY}/index.ts`],
      output: {
        path: BUILD_DIRECTORY,
        filename: 'index.js',
        publicPath: '/',
        library: packageJson.name,
        libraryTarget: 'umd',
        umdNamedDefine: true,
      },
      resolve: { extensions: EXTENSIONS },
    },
    excludePeerDependencies(),
    webpackBar(),
    webpackAnalyze(),
    webpackCleanDirectory(),
    loadTs(),
  )
}
