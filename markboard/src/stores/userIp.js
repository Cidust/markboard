import { defineStore } from "pinia";

export const useUserIpStore = defineStore('userIp',{
    state:()=>{
        return {
            ip:'',
        }
    },
    actions:{
        setUserIp(n){
            this.ip=n;
        }
    }
})