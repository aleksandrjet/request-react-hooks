import webpackMerge from 'webpack-merge'

import { BUILD_DIRECTORY, EXAMPLES_DIRECTORY, EXTENSIONS } from '../constants'
import { loadTs } from '../modules/loadTs'

export default webpackMerge(
  {
    mode: 'development',
    devtool: 'source-map',
    entry: [`${EXAMPLES_DIRECTORY}/index.ts`],
    output: {
      path: `${BUILD_DIRECTORY}/${EXAMPLES_DIRECTORY}`,
      filename: 'index.js',
      publicPath: '/',
    },
    resolve: { extensions: EXTENSIONS },
  },
  loadTs(),
)
