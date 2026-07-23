import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { statSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = resolve(__dirname, '../src/assets/images')

const source = resolve(imagesDir, 'createnote_banner.png')
const target = resolve(imagesDir, 'createnote_banner.webp')

const kb = (path) => (statSync(path).size / 1024).toFixed(1)

await sharp(source)
  .resize({ width: 1100, withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toFile(target)

console.log(`PNG  : ${kb(source)} KB`)
console.log(`WebP : ${kb(target)} KB -> ${target}`)
