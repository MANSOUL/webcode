export default function getExtension(file: string) {
  return '.' + file.split('.').slice(-1)[0]
}
