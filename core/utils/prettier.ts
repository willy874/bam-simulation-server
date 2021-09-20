import prettier from 'prettier'
import path from 'path'

export const format = (str: string) => {
  try {
    const configPath = path.resolve(process.cwd(), '.prettierrc.js')
    return prettier.format(str, require(configPath))
  } catch (error) {
    return prettier.format(str, {
      semi: false,
      singleQuote: true,
      arrowParens: 'avoid',
      parser: 'babel',
    })
  }
}
