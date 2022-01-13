import Webpack from 'webpack'
import webpackMerge from 'webpack-merge'

import { config as commonConfig } from './webpack.common'
import {
  excludePeerDependencies,
  webpackAnalyze,
  webpackBar,
  webpackLibraryName,
} from '../modules/buildUtils'

export const webpackLibrary: () => Webpack.Configuration = () => {
  return webpackMerge(
    commonConfig(),
    {
      mode: 'production',
      devtool: false,
    },
    webpackLibraryName(),
    excludePeerDependencies(),
    webpackBar(),
    webpackAnalyze(),
  )
}
