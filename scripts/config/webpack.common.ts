import Webpack from 'webpack'
import webpackMerge from 'webpack-merge'

import { loadTs } from '../modules/loadTs'
import { webpackCleanDirectory } from '../modules/buildUtils'
import { BUILD_DIRECTORY, EXTENSIONS, SOURCE_DIRECTORY } from '../constants'

export const config: () => Webpack.Configuration = () => {
  return webpackMerge(
    {
      entry: [`${SOURCE_DIRECTORY}/index.ts`],
      output: { path: BUILD_DIRECTORY, filename: 'index.js', publicPath: '/' },
      resolve: { extensions: EXTENSIONS },
    },
    loadTs(),
    webpackCleanDirectory(),
  )
}
