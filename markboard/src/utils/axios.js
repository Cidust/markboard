
import { baseUrl } from "./env";
import axios from "axios";


const service=axios.create({
    baseURL:baseUrl,
    timeout:5000
})

//请求拦截器
service.interceptors.request.use(
    //发送请求之前做的
    config=>{
        return config;
    },
    //对错误请求做的
    error=>{
        console.log(error);
        return Promise.reject();
    }
)

//添加响应拦截器
service.interceptors.response.use(
    //对相应数据做的
    response=>{
        if(response.status===200){
            return response.data;
        }else{
            Promise.reject();
        }
    },
    //对错误相应做的
    error=>{
        console.log(error);
        return Promise.reject();
    }
)