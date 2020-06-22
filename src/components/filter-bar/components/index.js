const ctx = require.context('./', false, /.vue$/)

const files = {}
ctx.keys().forEach(url => {
  const name = url.slice(2, -4)
  files[name] = ctx(url).default || ctx(url)
})

export default {
  ...files,
  // 与该文件不在同一级的组件需要手动引入
  Selector: () => import(/* webpackChunkName: "filter-components" */ './selector/Selector.vue')
}
