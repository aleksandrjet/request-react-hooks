import webpackMerge from 'webpack-merge'

import { config as commonConfig } from './webpack.common'

export default webpackMerge(commonConfig(), {
  mode: 'development',
  devtool: false,
})
