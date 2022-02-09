import webpackMerge from 'webpack-merge'

import { config as commonConfig } from './webpack.common'
import { EXAMPLES_DIRECTORY, SOURCE_DIRECTORY } from '../constants'

export default webpackMerge(commonConfig(), {
  mode: 'development',
  devtool: false,
  entry: [`${SOURCE_DIRECTORY}/examples/index.ts`],
  output: { path: EXAMPLES_DIRECTORY, filename: 'index.js', publicPath: '/' },
})
