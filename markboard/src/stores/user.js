import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state:()=>{
        return {
            user:'',
        }
    },
    actions:{
        getUser(n){
            this.user=n;
        }
    }
})