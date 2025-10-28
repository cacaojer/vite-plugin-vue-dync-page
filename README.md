# vite-plugin-vue-dync-page

每次打包生成带版本号的 index.html

生成编译版本号 `build-version.json`

复制原 `index.html` 为 `index_.html`

将原 `index.html` 重命名为 `index_编译版本号.html`

将插件预设内容写入新的 `index.html`
