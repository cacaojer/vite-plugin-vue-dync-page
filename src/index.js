import { readFileSync, renameSync, writeFileSync, copyFileSync } from "node:fs"
import { join } from "node:path"

async function plugin() {
  const dyncPage = {
    name: "vite-plugin-vue-dync-page",
    writeBundle({ dir }, bundle) {
      const fileName = "index.html"
      const inFile = bundle[fileName]
      if (inFile && inFile.fileName) {
        const buildVersion = new Date(Date.now() + 1000 * 60 * 60 * 8)
          .toISOString()
          .replace(/[T:\-.Z]/g, "")
          .substring(4, 14)
        writeFileSync(
          join(dir, "build-version.json"),
          JSON.stringify({ build: buildVersion }),
        )
        const index = join(dir, fileName)
        const refrush = join(dir, `index_${buildVersion}.html`)
        const back = join(dir, `_${fileName}`)
        renameSync(index, refrush)
        // renameSync(back, index)
        const htmlStr = readFileSync("./index.html", "utf8")
        writeFileSync(index, htmlStr)
        copyFileSync(refrush, back)
      }
    },
  }
  return dyncPage
}

export default plugin
