export const getBase = (filePath: string) => {
  return filePath
    .split('/')
    .slice(-1)
    .toString()
}
