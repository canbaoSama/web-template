import path from 'node:path'

import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { h, insertHtml } from 'vite-plugin-insert-html'
import vitePluginRequire from 'vite-plugin-require'

export default defineConfig(() => {
    return {
        base: './',
        plugins: [
            vue(),
            // script setup语法糖增强插件 @
            VueSetupExtend(),
            viteStaticCopy({
                targets: [
                    {
                        src: 'node_modules/xxx', // 原始路径
                        dest: 'libs/xxx', // 打包后复制到的路径
                    },
                ],
            }),
            vitePluginRequire(), // 在项目中引入 require
            insertHtml({
                // 打包时在index.html文件的body中插入文件引用
                body: [
                    h('script', {
                        src: '/xxx', // 你的路径
                    }),
                ],
            }),
            UnoCSS(), // 引入的unocss插件
        ],
        resolve: { // 配置系统别名，打包后vite无法正确打包通过别名引用的文件，UI库中的Image组件使用别名也无法加载图片，需要其他配置，文件引入方式具体可查看READNE.md
            alias: [
                { find: '@', replacement: '/src' },
                { find: '@@', replacement: '/src/assets' },
            ],
        },
        css: {
            // css预处理器
            preprocessorOptions: {
                less: {
                    charset: false,
                    additionalData: '@import "./src/styles/value.less";',
                },
            },
        },
        server: {
            host: '0.0.0.0',
            port: 8080,
            compress: true,
            proxy: {
                '/api': {
                    target: 'http://192.168.3.107',

                },
                '/images': {
                    target: 'http://192.168.3.107/map/images',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/images/, '/map/images'),
                },
            },
        },
        build: {
            sourcemap: process.env.NODE_ENV !== 'production', // 在开发环境默认启用了 Source Map 以便更容易调试,在生产环境关闭 Source Map 以减小构建体积
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: process.env.NODE_ENV === 'production', // 仅在生产环境删除 debugger
                },
            },
            outDir: 'dist', // 指定输出路径
            assetsDir: 'assets', // 指定生成静态资源的存放路径
            assetsInlineLimit: 4096, // 图片转base64编码的阈值，为了防止过多的http请求，vite会将小于此阈值的图片转为base64格式，可根据实际需求进行调整
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                    entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                    assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件，比如字体、图片等
                    manualChunks(id) {
                        // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
                        if (id.includes(path.resolve(__dirname, '/src/store/index.ts')))
                            return 'vendor'
                    },
                },
            },
            cacheDir: 'node_modules/.vite', // 启用缓存，加快构建速度
            esbuild: {
                drop: ['console', 'debugger'], // 删除代码中的 console 和 debugger 语句
            },
        },
    }
})
