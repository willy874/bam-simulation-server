import path from 'path'

/**
 * @param {string} handlePath 要處理的路徑
 * @returns {Module} 回傳 default 檔案模組
 */
export const getModuleDefault = (...handlePath: string[]) => {
  try {
    return require(path.resolve(process.cwd(), ...handlePath)).default
  } catch (error) {
    return {}
  }
}