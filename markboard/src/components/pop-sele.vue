<script setup>
import { computed, defineModel, defineProps, onMounted, onUpdated } from "vue";
import comNote from './com-note.vue';
import myButton from './my-button.vue';
import { comData } from '@/mock/index'
import { headColor } from '@/utils/data'
import { myDate } from '@/utils/method';
import { ref } from "vue";
import { useUserIpStore } from "@/stores/userIp";
import { watch } from "vue";
import { findCommentPageApi } from "@/api";
const props = defineProps({
    card: {
        default: () => ({})
    }
})

const sele = defineModel({
    default: false
})

// 按钮点击相关组件
const commes = ref('');
const comname = ref('');
const canClick = computed(() => {
    if (commes.value) {
        return true;
    } else {
        return false
    }
})

// 打开时清零
const page = ref(1);
const pagesize = ref(5);
const comments = ref([]);
function initComment() {
    if (page.value > 0) {
        let data = {
            page: page.value,
            pagesize: pagesize.value,
            id: props.card.id
        }
        console.log('测试初始化时间', data);
        findCommentPageApi(data).then((res) => {
            comments.value = comments.value.concat(res.message);
            if (res.message.length) {
                page.value++;
            } else {
                page.value = 0;
            }
            console.log(comments.value);
        })

    }

}


// 如果打开了详情则获取一次
watch(sele, (sele) => {
    if (sele) {
        initComment();
    }
})

const userIp = useUserIpStore();
// 提交相关
function submit(card) {
    if (canClick.value) {
        let name = '匿名';
        if (comname.value) {
            name = comname.value;
        }
        console.log(card);
        let data = {
            noteId: card.id,
            userId: userIp.ip,
            moment: new Date(),
            name: name,
            comment: commes
        };
        console.log(data);
        // insertCommentApi(data).then(()=>{
        //     comment
        // })
    }
}
</script>

<template>
    <transition name="pop">
        <div class="popCom" v-if="sele">
            <div class="pop-head" v-if="sele">
                <p class="pop-name">举报</p>
                <img class="icon" @click="sele = !sele" src="../assets/fonts/close.svg">
            </div>
            <div class="popMain">
                <div class="details">
                    <div class="note-flex">
                        <comNote :note="props.card"></comNote>
                    </div>
                    <div class="form">
                        <textarea class="message" placeholder="期待您的评论" maxlength="60" v-model="commes"></textarea>
                        <div class="bt">
                            <input class="name" type="text" placeholder="您的昵称" maxlength="14" v-model="comname">
                            <myButton :class="{ notAllowed: !canClick, ack: canClick }" @click="submit(props.card)">确定
                            </myButton>
                        </div>
                    </div>
                    <p class="title">评论{{ props.card.comcount[0].count }}</p>
                    <div class="comment">
                        <div class="comment-li" v-for="(comment, index) in comments" :key="index">
                            <div class="user-head"
                                :style="{ backgroundImage: headColor[Math.floor(Math.random() * 12)] }"></div>
                            <div class="com-main">
                                <div class="com-head">
                                    <p class="com-name">{{ comment.name }}</p>
                                    <p class="com-time">{{ myDate(comment.moment) }}</p>
                                </div>
                                <div class="com-text">{{ comment.comment }}</div>
                            </div>
                        </div>
                    </div>
                </div>
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

.details {
    padding: 0 20px;
}

.note-flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.form {
    padding: 20px 12px;

}

.bt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
}

.message {
    color: #595959;
    resize: none;
    padding: 0;
    width: 286px;
    height: 80px;
    font-family: Arial, Helvetica, sans-serif;
    border: 1px solid #595959;
}

.message:focus {
    outline: none;
}

.name {
    color: #595959;
    width: 190px;
    border: 1px solid #595959;
    line-height: 30px;
}

.name:focus {
    outline: none;
}

.title {
    padding-left: -10px;
}

.comment-li {
    display: flex;
    padding-bottom: 30px;
}

.user-head {
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 20px;
    background-image: linear-gradient(180deg, #ffa39e 0%, #f5222d 100%);
}

.ack {
    cursor: pointer;
}

.com-main {
    padding: 0 8px;
}

.com-head {
    display: flex;
    align-items: center;
}

.com-name {
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 8px;
}

.com-time {
    color: #595959;
    font-size: 12px;
    margin: 0;
}

.notAllowed {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>