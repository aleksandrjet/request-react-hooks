import * as path from 'path'
import { path as PROJECT_DIRECTORY } from 'app-root-path'

export const BUILD_DIRECTORY = path.resolve(PROJECT_DIRECTORY, './lib')
export const EXAMPLES_DIRECTORY = path.resolve(PROJECT_DIRECTORY, './examples')
export const EXTENSIONS: string[] = ['.ts', '.tsx', '.js', '.jsx']

export default {
  mode: 'development',
  devtool: 'source-map',
  entry: [`${EXAMPLES_DIRECTORY}/index.ts`],
  output: {
    path: `${BUILD_DIRECTORY}/${EXAMPLES_DIRECTORY}`,
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: { extensions: EXTENSIONS },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                outDir: BUILD_DIRECTORY,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
}