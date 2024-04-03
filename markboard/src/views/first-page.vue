<script setup>
import headbar from "../components/head-bar.vue";
import footbar from "../components/foot-bar.vue";
</script>

<template>
    <headbar></headbar>
    <router-view id="main"></router-view>
    <footbar></footbar>
</template>

<style scoped>
#main {
    min-height: 1000px;
    margin-top: 100px;
}
</style>
