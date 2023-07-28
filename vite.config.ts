import path, { resolve } from 'node:path'

import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { h, insertHtml } from 'vite-plugin-insert-html'

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
                        src: '原始路径',
                        dest: '复制到的路径',
                    },
                ],
            }),
            insertHtml({
                // 打包时在index.html文件的body中插入文件引用
                body: [
                    h('script', {
                        src: '你的路径',
                    }),
                ],
            }),
            UnoCSS(),
        ],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src'),
                },
                {
                    find: '@@',
                    replacement: resolve(__dirname, './src/assets'),
                },
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
            proxy: {
                '/api': {
                    target: 'http://192.168.3.107',

                },
                '/images': {
                    target: 'http://192.168.3.107/map/images',
                },
            },
        },
        build: {
            sourcemap: true,
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
            outDir: 'dist', // 指定输出路径
            assetsDir: 'assets', // 指定生成静态资源的存放路径
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
                        if (id.includes(path.resolve(__dirname, '/src/store/index.ts')))
                            return 'vendor'
                    },
                },
            },
        },
    }
})
