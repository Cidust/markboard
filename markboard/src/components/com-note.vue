<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue';
import { myDate } from '@/utils/method';
import { cardColor } from '@/utils/data';

const likeGray = 'src/assets/fonts/love.svg';
const likeRed = 'src/assets/fonts/love-red.svg';

const likeCurrent = ref(likeGray);

function handleHover() {
    likeCurrent.value = likeRed;
}
function handleLeave() {
    likeCurrent.value = likeGray
}



const card = computed(() => props.note)

const props = defineProps({
    width: {
        type: String,
        default: '288px'
    },
    note: {
        type: Object,
        default: () => ({}),
    }
})


const likeChange = () => {
    if (card.value.islike[0].count>0) {
        likeCurrent.value = likeRed
    }
}
onMounted(()=>likeChange())
</script>

<template>
    <div class="mynote" :style="{ width: props.width, background: cardColor[card.color] }">
        <div class="head">
            <p class="time">{{ myDate(card.moment) }}</p>
            <p class="label">{{ card.label }}</p>
        </div>
        <p class="field">{{ card.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="foot-parts">
                    <img class="icon like-icon" :src="likeCurrent" :class="{ islike: card.islike[0].count > 0 }"
                        @mouseover="handleHover()" @mouseleave="handleLeave()">
                    <span class="values">{{ card.like[0].count }}</span>
                </div>
                <div class="foot-parts">
                    <img class="icon" src="../assets/fonts/chat.svg">
                    <span class="values">{{ card.comcount[0].count }}</span>
                </div>
            </div>
            <div class="name">{{ card.name }}</div>
        </div>
    </div>
</template>

<style scoped>
.mynote {
    height: 240px;
    padding: 10px 20px 16px;
    box-sizing: border-box;
    position: relative;
    border-radius: 4px;
}

.head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
}

.head p {
    font-size: 12px;
    color: #595959;
}

.field {
    height: 140px;
    font-size: 14px;
    color: #262626;
    cursor: pointer;
}

.foot {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
}

.icon {
    width: 16px;
    cursor: pointer;
}

.like-icon {
    width: 18px;
    cursor: pointer;
}

.foot-left {
    display: flex;
}

.foot-parts {
    display: flex;
    align-items: center;
}

.values {
    padding: 0 4px;
    font-size: 12px;
    color: #595959;

}

.name {
    font-size: 16px;
    color: #595959;
    text-align: right;
}
</style>