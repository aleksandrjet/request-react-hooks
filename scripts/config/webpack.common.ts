import Webpack from 'webpack'
import webpackMerge from 'webpack-merge'

import { loadTs } from '../modules/loadTs'
import { EXTENSIONS } from '../constants'

export const config: () => Webpack.Configuration = () => {
  return webpackMerge(
    {
      resolve: { extensions: EXTENSIONS },
    },
    loadTs(),
  )
}
