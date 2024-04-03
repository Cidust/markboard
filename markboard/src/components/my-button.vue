<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: 'base'
    },
    norm: {
        type: String,
        default: 'primary'
    }
})
</script>

<template>
    <button class="mybtn" :class="[props.size, props.norm]">
        <slot></slot>
    </button>
</template>

<style scoped>
.mybtn {
    text-align: center;
    border: none;
}

/*size*/
.max {
    min-width: 100px;
    height: 48px;
    border-radius: 24px;
    padding: 0 20px;
}

.base {
    min-width: 80px;
    height: 36px;
    border-radius: 20px;
    padding: 0 20px;
}

.small {
    min-width: 60px;
    height: 24px;
    border-radius: 14px;
    padding: 0 20px;
}

/*norm*/
.primary {
    background: #262626;
    color: #fafafa;
}

.secondary {
    background: none;
    color: #262626;
    border: 1px solid #262626;
}

.cprimary {
    background: #08979c;
    color: #fafafa;
    font-weight: 600;
}

.csecondary {
    background: #fafafa;
    color: #262626;
}
</style>


