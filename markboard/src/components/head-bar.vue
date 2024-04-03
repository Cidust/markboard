<script setup>
import { computed} from 'vue';
import myButton from './my-button.vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const defaultId=0;
const route=useRoute();
const id=computed(()=>route.query.id||defaultId);

function idChange(n) {
    router.replace({
        //path:'/Comment/'+n,
        query:{id:n}
    })
}
</script>

<template>
    <div id="headroot">
        <div id="headicon">
            <div>⊙{{ id }}</div>
        </div>
        <div id="menu">
            <myButton class="menu-btn" size="base" :norm="id==0?'cprimary':'csecondary'" @click="idChange(0)">五餐</myButton>
            <myButton class="menu-btn" size="base" :norm="id==1?'cprimary':'csecondary'" @click="idChange(1)">六餐</myButton>
            <myButton class="menu-btn" size="base" :norm="id==2?'cprimary':'csecondary'" @click="idChange(2)">八餐</myButton>
        </div>
        <div id="tailicon"></div>
    </div>
</template>

<style scoped>
.menu-btn{
    cursor: pointer;
}
#headroot {
    width: 100%;
    height: 50px;
    background-color: #fafafa;
    box-shadow: 0 4px 3px #c1d2d1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    z-index: 9999;
}

#headicon {
    width: 40px;
    font-size: 40px;
    padding-left: 10px;
    margin-top: -6px;
}

#tailicon {
    background-image: url("../assets/fonts/login.svg");
    background-repeat: no-repeat;
    background-size: 30px;
    width: 40px;
    height: 40px;
    padding-right: 10px;
    margin-top: 10px;
}
</style>
