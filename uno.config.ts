import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
    shortcuts: [
        {
            'wh-full': 'w-full h-full',
        },
    ],
    rules: [

        ['shadow-water-4', { 'box-shadow': '0 0 4px 4px #73c9c4' }],
    ],
    theme: {
        colors: {
            waterColor: '#73c9c4', // 水色，infowindow 的 shadow 颜色
        },
    },
    presets: [
        presetUno(), // 预设的超集
        presetAttributify(), // 简写
        // presetIcons(), // icons
    ],
})
