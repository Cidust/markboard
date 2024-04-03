const env=import.meta.VITE_NODE_ENV
let baseUrl='';//域名地址
let routerMode = 'hash';

if(env=='development'){
    baseUrl='http://localhost:3000';
}else{
    baseUrl='http://localhost:3000';
}

export {
    baseUrl,
    routerMode
}