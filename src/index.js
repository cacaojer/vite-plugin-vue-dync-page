import { readFileSync, renameSync, writeFileSync, copyFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pluginIndexPath = join(__dirname, "index.html")
const pluginIndexHtml = readFileSync(pluginIndexPath, "utf8")

async function plugin() {
  const dyncPage = {
    name: "vite-plugin-vue-dync-page",
    writeBundle({ dir }, bundle) {
      const indexHtml = "index.html"
      const inFile = bundle[indexHtml]
      if (inFile && inFile.fileName) {
        const buildVersion = new Date(Date.now() + 1000 * 60 * 60 * 8)
          .toISOString()
          .replace(/[T:\-.Z]/g, "")
          .substring(4, 14)
        writeFileSync(
          join(dir, "build-version.json"),
          JSON.stringify({ build: buildVersion }),
        )
        const indexFile = join(dir, indexHtml)
        const idnexVersionFile = join(dir, `index_${buildVersion}.html`)
        const indexHtmlBackup = join(dir, `_${indexHtml}`)
        copyFileSync(indexFile, indexHtmlBackup)
        renameSync(indexFile, idnexVersionFile)
        writeFileSync(indexFile, pluginIndexHtml)
      }
    },
  }
  return dyncPage
}

export default plugin
