<script setup lang="ts" name="App">
import { onMounted } from 'vue'

onMounted(() => {
    setInterval(() => {
        window.parent.postMessage('hello,father', 'http://localhost:8080/preview/pages/Demo/index')
    }, 3000)
    window.onmessage = (mes) => {
        console.warn(`接受父${mes}`)
    }
})
</script>

<template>
    <router-view />
</template>

<style lang="less"></style>
