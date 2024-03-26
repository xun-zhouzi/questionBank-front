import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  outDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false, //关闭语法检查
  server: {
    open: true,
    host: true,
    port: 80,
    https: false,
  },
  disableHostCheck: true,
    // 配置代理
  proxy: {
    [process.env.VUE_APP_BASE_API]: {
      target: 'http://localhost:8080',
      changeOrigin: false,
      pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_API]: ''
      }
      // 更多代理配置选项...
    },
  }
 
})
