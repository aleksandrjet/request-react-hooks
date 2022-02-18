import Webpack from 'webpack'

import { BUILD_DIRECTORY } from '../constants'

export const loadTs = (): Webpack.Configuration => {
  return {
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
}
