<script setup>
import comNote from './com-note.vue';
import { defineProps } from 'vue';
import myButton from './my-button.vue';
import {comData} from '@/mock/index'
import {headColor} from '@/utils/data'
import { myDate } from '@/utils/method';
const props = defineProps({
    card: {
        default: () => ({})
    }
})
</script>

<template>
    <div class="details">
        <div class="note-flex">
            <comNote :note="props.card"></comNote>
        </div>
        <div class="form">
            <textarea class="message" placeholder="期待您的评论" maxlength="60"></textarea>
            <div class="bt">
                <input class="name" type="text" placeholder="您的昵称" maxlength="14">
                <myButton class="ack">确定</myButton>
            </div>
        </div>
        <p class="title">评论{{ card.comment }}</p>
        <div class="comment">
            <div class="comment-li" v-for="(comment,index) in comData.data" :key="index">
                <div class="user-head" :style="{backgroundImage:headColor[comment.imgurl]}"></div>
                <div class="com-main">
                    <div class="com-head">
                        <p class="com-name">{{ comment.name }}</p>
                        <p class="com-time">{{ myDate(comment.moment) }}</p>
                    </div>
                    <div class="com-text">{{ comment.message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    width: 190px;
    border: 1px solid #595959;
    line-height: 30px;
}

.name:focus {
    outline: none;
}

.title{
    padding-left: -10px;
}
.comment-li{
    display: flex;
    padding-bottom: 30px;
}
.user-head{
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 20px;
    background-image: linear-gradient(180deg,#ffa39e 0%,#f5222d 100%);
}
.ack{
    cursor: pointer;
}
.com-main{
    padding: 0 8px;
}
.com-head{
    display: flex;
    align-items: center;
}
.com-name{
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 8px;
}
.com-time{
    color: #595959;
    font-size: 12px;
    margin: 0;
}
</style>