import * as path from 'path'
import { path as PROJECT_DIRECTORY } from 'app-root-path'

export const BUILD_DIRECTORY = path.resolve(PROJECT_DIRECTORY, './lib')
export const EXAMPLES_DIRECTORY = path.resolve(PROJECT_DIRECTORY, './examples')
export const SOURCE_DIRECTORY = path.resolve(PROJECT_DIRECTORY, './src')

export const EXTENSIONS: string[] = ['.ts', '.tsx', '.js', '.jsx']
