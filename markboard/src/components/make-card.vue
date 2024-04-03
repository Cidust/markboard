<script setup>
import { useUserStore } from '@/stores/user';
import { lables } from '@/utils/data';
import { cardOriginColor, cardColor } from '@/utils/data';
import { computed, ref } from 'vue';
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';

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

const mes=defineModel("mes");
const tex=defineModel("tex");
const route=useRoute();
const rest=computed(()=>route.query.id||0);
const user=useUserStore();
function submit() {
    let name='匿名';
    if(tex.value){
        name=tex;
    }
    let data={
        rest:rest,
        message:mes,
        name:name,
        userId:user.$id,
        moment:new Date(),
        label:lableSelected,
        color:colorSelected
    }
    console.log(data);
}
</script>

<template>
    <div class="new-card">
        <div class="colors">
            <p class="color-list" v-for="(color, index) in cardOriginColor" :key="index" :style="{ background: color }"
                :class="{ colorSelected: index == colorSelected }" @click="colorChange(index)" >
            </p>
        </div>
        <div class="card-main" :style="{ background: cardColor[colorSelected] }">
            <textarea  class="message" maxlength="100" placeholder="期待您的评价" v-model="mes"></textarea>
            <input type="text"  class="name" maxlength="14" placeholder="您的昵称" v-model="tex">
        </div>
        <div class="lables">
            <p class="title" id="windows">请选择对应的窗口</p>
            <div class="lable-flex">
                <p v-for="(lable, index) in lables[props.id]" :key="index" class="lable-list"
                    :class="{ lableSelected: index == lableSelected }" @click="lableChange(index)">{{ lable }}</p>
            </div>
        </div>
        <div>
            <p class="title">声明</p>
            <p class="notice">请勿发布违规违纪违法内容</p>
        </div>
    </div>
</template>

<style scoped>

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

#windows{
    margin-top: 24px;
}
</style>