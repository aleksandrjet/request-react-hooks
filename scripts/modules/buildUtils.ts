import Webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import packageJson from '../../package.json'

export const webpackBar = (): Webpack.Configuration => {
  return {
    plugins: [new WebpackBar({})],
  }
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

export const webpackCleanDirectory = (): Webpack.Configuration => {
  return {
    plugins: [new CleanWebpackPlugin({ verbose: false })],
  }
}

export const webpackLibraryName = (): Webpack.Configuration => {
  return {
    output: {
      library: packageJson.name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
  }
}

export const excludePeerDependencies = (): Webpack.Configuration => {
  const peerDependencies: string[] = Object.keys(packageJson.peerDependencies)

  return {
    externals: peerDependencies,
  }
}
