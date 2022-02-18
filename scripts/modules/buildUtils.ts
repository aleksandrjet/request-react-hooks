import Webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import packageJson from '../../package.json'

export const excludePeerDependencies = (): Webpack.Configuration => {
  return { externals: Object.keys(packageJson.peerDependencies) }
}

export const webpackCleanDirectory = (): Webpack.Configuration => {
  return { plugins: [new CleanWebpackPlugin({ verbose: false })] }
}

export const webpackBar = (): Webpack.Configuration => {
  return { plugins: [new WebpackBar({})] }
}

export const webpackAnalyze = (): Webpack.Configuration => {
  return {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true,
      }) as any,
    ],
  }
}
