<script setup>
import { computed, defineModel, ref } from "vue";
import myButton from "./my-button.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useUserIpStore } from "@/stores/userIp";
import { lables } from '@/utils/data';
import { cardOriginColor, cardColor } from '@/utils/data';
import { insertNoteApi } from "@/api";
import { ElMessage } from "element-plus";

const mes = ref("");
const tex = ref("");

const crea = defineModel({
    default: false
})

const props = defineProps({
    id: Number,
})

const colorSelected = ref(0);
function colorChange(index) {
    colorSelected.value = index;
}

const lableSelected = ref(0);
function lableChange(index) {
    lableSelected.value = index;
}

function drop() {
    crea.value = !crea.value;
    lableSelected.value = 0;
    colorSelected.value = 0;
    mes.value = '';
    tex.value = '';
}

const route = useRoute();
const rest = computed(() => route.query.id || 0);
const userIp = useUserIpStore();
const emit = defineEmits(['clickbt']);
function submit() {
    let name = '匿名';
    if (tex.value) {
        name = tex.value;
    }
    let data = {
        rest: rest.value,
        message: mes.value,
        name: name,
        userId: userIp.ip,
        moment: new Date(),
        label: lableSelected.value,
        color: colorSelected.value
    }

    
    // console.log(data);
    insertNoteApi(data).then((res) => {
        // console.log(res);
        let cardData = {
            rest: rest.value,
            message: mes.value,
            name: name,
            userId: userIp.ip,
            moment: new Date(),
            label: lableSelected.value,
            color: colorSelected.value,
            id:res.message.insertId,
            comcount:[{count:0}],
            islike:[{count:0}],
            like:[{count:0}],
            report:[{count:0}],
        }
        ElMessage.success('成功！感谢您的留言！')
        emit('clickbt', cardData);
        mes.value='';
    })
}


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
                <div class="new-card">
                    <div class="colors">
                        <p class="color-list" v-for="(color, index) in cardOriginColor" :key="index"
                            :style="{ background: color }" :class="{ colorSelected: index == colorSelected }"
                            @click="colorChange(index)">
                        </p>
                    </div>
                    <div class="card-main" :style="{ background: cardColor[colorSelected] }">
                        <textarea class="message" maxlength="100" placeholder="期待您的评价" v-model="mes"></textarea>
                        <input type="text" class="name" maxlength="14" placeholder="您的昵称" v-model="tex">
                    </div>
                    <div class="lables">
                        <p class="title" id="windows">请选择对应的窗口</p>
                        <div class="lable-flex">
                            <p v-for="(lable, index) in lables[props.id]" :key="index" class="lable-list"
                                :class="{ lableSelected: index == lableSelected }" @click="lableChange(index)">{{ lable
                                }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="title">声明</p>
                        <p class="notice">请勿发布违规违纪违法内容</p>
                    </div>
                </div>
            </div>
            <div class="tail" v-if="crea">
                <myButton size="max" norm="secondary" class="drop" @click="drop()">丢弃</myButton>
                <myButton size="max" class="submit" @click="submit()">确认</myButton>
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

.colors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: -10px;
    padding-left: 24%;
    padding-right: 18%;
    box-sizing: border-box;
}

.color-list {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border: 1px solid #fafafa;
    transition: all 0.3s;
}

.colorSelected {
    border: 1px solid #262626;
}

.card-main {
    padding: 12px;
    box-sizing: border-box;
    height: 240px;
    padding: 6px;
    margin: 6px;
    display: block;
    border-radius: 4px;
    transition: all 0.3s;
}

.message {
    color: #595959;
    background: none;
    border: none;
    resize: none;
    width: 100%;
    height: 80%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
}

.message:focus {
    outline: none;
}

.name {
    color: #595959;
    width: 100%;
    background: none;
    border: none;
    border-top: 1px dashed #ffffff;
    padding-top: 12px;
}

.name:focus {
    outline: none;
}

.title {
    color: #595959;
    font-weight: 600;
    padding-left: 8px
}

.lable-flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.lable-list {
    padding: 2px 8px;
    border-radius: 20px;
    color: #595959;
    border: 1px none;
    font-size: 12px;
}

.lable-list:hover {
    cursor: pointer;
}

.lableSelected {
    border: 1px solid #262626;
    color: #262626;
    font-weight: 600;
}

.notice {
    font-size: 12px;
    color: #595959;
    padding-left: 8px;
    margin-top: 24px;
}

#windows {
    margin-top: 24px;
}
</style>