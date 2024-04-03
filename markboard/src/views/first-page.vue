<script setup>
import headbar from "../components/head-bar.vue";
import footbar from "../components/foot-bar.vue";

import { signIpApi } from "@/api";
import { onMounted } from "vue";
import { useUserIpStore } from "@/stores/userIp";

const userIp = useUserIpStore();

function getUser() {
    signIpApi().then((res) => {
        userIp.setUserIp(res.ip);
    })
}
onMounted(() => { getUser() });
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