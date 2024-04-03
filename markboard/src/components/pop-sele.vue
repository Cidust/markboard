<script setup>
import { defineModel } from "vue";

const sele=defineModel({
    default:false
})
</script>

<template>
    <transition name="pop">
        <div class="popCom" v-if="sele">
            <div class="pop-head" v-if="sele">
                <p class="pop-name">举报</p>
                <img class="icon" @click="sele = !sele" src="../assets/fonts/close.svg">
            </div>
            <div class="popMain">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.pop-enter-from {
    transform: translateX(360px);
}

.pop-enter-active {
    transition: all 0.2s ease-out;
}

.pop-enter-to {
    transform: translateX(0px);
}

.pop-leave-from {
    transform: translateX(0px);
}

.pop-leave-active {
    transition: all 0.2s ease-in;
}

.pop-leave-to {
    transform: translateX(360px);
}

.popCom {
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 50px;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.8);
}

.pop-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    box-sizing: border-box;
}

.pop-name {
    font-size: 16px;
    color: #cf1322;
    font-weight: 600;
    padding-bottom: 4px;
    cursor: pointer;
}

.icon {
    width: 18px;
    padding: 6px;
    cursor: pointer;
}

.popMain {
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 200px;
    margin: 2px;
}

.popMain::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

.popMain::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #595959;
}

.popMain::-webkit-scrollbar-track {
    border-radius: 4px;
    background: #bfbfbf;
}
</style>