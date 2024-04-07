<script setup>
import { wallTypes, lables } from '@/utils/data';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import mynote from '@/components/com-note.vue';
import { noteData } from "@/mock/index"
import popcreat from '@/components/pop-create.vue'
import popsele from '@/components/pop-sele.vue'
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { findNotePageApi } from '@/api';
import { useUserIpStore } from '@/stores/userIp';

let addBottom = ref(14);

function scrollBottom() {
    //距离顶部
    let scrollTop = document.documentElement.scrollTop || document.scrollTop;
    //屏幕高度
    let clientHeight = document.documentElement.clientHeight;
    //内容高度
    let scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight + 114 >= scrollHeight) {
        addBottom.value = scrollTop + clientHeight + 114 - scrollHeight;
    } else {
        addBottom.value = 14;
    }

    if (scrollTop + clientHeight + 100 >= scrollHeight) {
        getNoteCard();
    }
}

let needWidth = ref(0);
let nowWidth = window.innerWidth;
needWidth.value = Math.floor((nowWidth - 40) / 300) * 300;
const handleWindowResize = () => {
    nowWidth = window.innerWidth;
    needWidth.value = Math.floor((nowWidth - 40) / 300) * 300;
};
onMounted(() => {
    //监听宽度变化
    window.addEventListener('resize', handleWindowResize);
    //监听屏幕滚动
    window.addEventListener('scroll', scrollBottom);
});
onBeforeUnmount(() => {
    //监听宽度变化
    window.removeEventListener('resize', handleWindowResize);
    //监听屏幕滚动
    window.addEventListener('scroll', scrollBottom);
});

//对应的餐厅编号,5->0,6->1,8->2
const defaultId = 0;
const route = useRoute();
const id = computed(() => Number(route.query.id || defaultId));

//如若界面更改至别的餐厅，则目前的打开的界面需要关闭
watch(id, () => {
    isCreate.value = false;
    isSelected.value = false;
})

const ischoose = ref(true);//默认全部选中

let lindex = ref(-1);//记录当前选中的标签

function sstate(index) {
    if (index >= 0) {//此时选中的是0到某个标签，所以对于“全部”的ischoose要置为false而其他的更新值
        ischoose.value = false;
        lindex.value = index;
        // 重置page
        page.value = 1;
        // 先清空所有的note
        cards.value = [];
        // 然后再重新获取当前选中的标签
        getNoteCard();
    } else {//此时选中的是“全部”标签，所以将lindex置为初始的-1
        ischoose.value = true;
        lindex.value = -1
        // 重置page
        page.value = 1;
        // 先清空所有的note
        cards.value = [];
        // 然后再重新获取当前选中的标签
        getNoteCard();
    }
}

const isCreate = ref(false);
const isSelected = ref(false);
const seleindex = ref(-1);

function noteChange(index) {
    if (index != seleindex.value) {
        isCreate.value = false;
        isSelected.value = true;
        seleindex.value = index;
    } else {
        isCreate.value = false;
        isSelected.value = false;
        seleindex.value = -1;
    }
}
function creaChange() {
    seleindex.value = -1;
    isCreate.value = !isCreate.value;
}

function creaNote(e) {
    // console.log(e);
    // 将新创建的卡片放到后面
    cards.value.unshift(e);
    // 关闭创造框
    creaChange();
}

const isNoNote = ref(true)

const isNomore = ref(true)

const cards = ref([]);
const page = ref(1);
const pagesize = ref(5);
const userIp = useUserIpStore();

function getNoteCard() {
    // page>0时执行
    if (page.value > 0) {
        isNomore.value = false;
        let data = {
            rest: id.value,
            page: page.value,
            pagesize: pagesize.value,
            userId: userIp.ip,
            lable: lindex.value
        }
        // console.log(data);
        findNotePageApi(data).then((res) => {
            cards.value = cards.value.concat(res.message);
            // console.log(res.message);
            if (res.message.length) {
                page.value++;
            } else {
                page.value = 0;
            }
            if (cards.value.length > 0) {
                isNoNote.value = false;
                if(page.value==0){
                    isNomore.value=true;
                }
            } else {
                isNoNote.value = true;
                isNomore.value = true;
            }
        })
    }
}

onMounted(getNoteCard);
</script>


<template>
    <div class="textpages">
        <!-- 标题、窗口、note本体 -->
        <p class="title">{{ wallTypes[id].name }}</p>
        <div class="lable">
            <p class="lable-list" :class="{ lselected: ischoose }" @click="sstate(-1)">全部</p>
            <p class="lable-list" :class="{ lselected: lindex == index }" @click="sstate(index)"
                v-for="(lable, index) in lables[id]" :key="lable">{{ lable }}</p>
        </div>
        <div class="card" :style="{ width: needWidth + 'px' }">
            <mynote v-for="(data, index) in cards" :key="data.id" :note="cards[index]" class="card-field"
                :class="{ noteSelected: index == seleindex }" @click="noteChange(index)"></mynote>
        </div>

        <!-- 当不存在卡片的时候展示 -->
        <div class="none-note" v-if="isNoNote">
            <p>还没有评价哦！</p>
        </div>

        <!-- 加载的动画
        <div class="anima">
            <div v-loading="!isLoad"></div>
        </div> -->

        <!-- 底部的提示 -->
        <div class="bottom-tip">
            <p class="nomore" v-if="isNomore">没有更多啦</p>
            <p v-loading="!isNomore"></p>
        </div>
     

        <!-- 创建或者选中一张卡片 -->
        <div class="add" :style="{ bottom: addBottom + 'px' }" v-if="!isCreate">
            <img class="icon" @click="creaChange()" src="../assets/fonts/add.svg">
        </div>
        <popcreat v-model="isCreate" :id="id" @clickbt="creaNote">
            <!-- <mkcard :id="id" v-model:mes="mes" v-model:tex="tex"></mkcard> -->
        </popcreat>
        <popsele v-model="isSelected" :card="cards[seleindex]">
            <!-- <dtcard :card="noteData.data[seleindex]"></dtcard> -->
        </popsele>
    </div>


</template>

<style scoped>
.title {
    font-size: 50px;
    text-align: center;
}

.lable {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: -20px;
}

.lable-list {
    padding: 0 8px;
    display: flex;
    align-items: center;
    height: 30px;
    margin: 6px;
    color: #595959;
    border: 1px solid #ffffff;
    border-radius: 20px;
    cursor: pointer;
}

.lselected {
    color: #262626;
    font-weight: 600;
    border: 1px solid #262626;
    border-radius: 20px;
}

.card {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    margin: auto;
}

.card-field {
    margin: 6px;
}

.add {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border: #262626 2px solid;
    border-radius: 28px;
    position: fixed;
    right: 30px;
    transition: all 0.2s;
}

.icon {
    width: 40px;
    cursor: pointer;
}

.noteSelected {
    border: 1px solid #13c2c2;
}

.none-note {
    width: 100%;
    text-align: center;
    margin-top: 200px;
    position: absolute;
    top: 280px;
}

.none-note p {
    font-weight: 700;
    font-size: 24px;
    color: #595959;
}

.bottom-tip {
    margin: 0;
    margin-top: 100px;
    margin-bottom: 20px;
}
.nomore{
    color: #595959;
    text-align: center;
    font-size: 16px;
}
</style>
