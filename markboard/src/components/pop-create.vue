<script setup>
import { defineModel } from "vue";
import myButton from "./my-button.vue";
import axios from "axios";

const crea = defineModel({
    default: false
})

function aipTest() {
    let data = {
        rest: 0,
        message: '测试用的文本',
        name: '田所浩二',
        userId: '114514',
        moment: new Date(),
        label: 0,
        color: 3
    };
    axios
        .post("http://localhost:3000/insertnote", data)
        .then((res) => {
            console.log(res);
        })
}


</script>

<template>
    <transition name="pop">
        <div class="popCom" v-if="crea">
            <div class="pop-head" v-if="crea">
                <p class="pop-name">写评论</p>
                <img class="icon" @click="crea = !crea" src="../assets/fonts/close.svg">
            </div>
            <div class="popMain">
                <slot></slot>
            </div>
            <div class="tail" v-if="crea">
                <myButton size="max" norm="secondary" class="drop" @click="crea = !crea">丢弃</myButton>
                <myButton size="max" class="submit" @click="aipTest()">确认</myButton>
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
    color: #595959;
    font-weight: 600;
    padding-bottom: 4px;
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

.tail {
    height: 40px;
    width: 100%;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    position: fixed;
    bottom: 50px;
}

.drop {
    cursor: pointer;
}

.submit {
    margin-left: 20px;
    width: 200px;
    cursor: pointer;
}
</style>