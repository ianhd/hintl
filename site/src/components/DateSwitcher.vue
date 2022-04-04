<script setup>
import { computed } from 'vue'
import wordSvc from '@/services/wordService.js'

const isNext = computed(() => {
    return false
})

const isPrev = computed(() => {
    return true
})

const go = (nextOrPrev) => {

}

const ws = new wordSvc()
</script>

<template>
    <div class="">
        <a href="#" :class="{'disabled':!isPrev}" @click.prevent="go('prev')">Prev</a>
        <span class="date">Today</span>
        <a href="#" :class="{'disabled':!isNext}" @click.prevent="go('next')">Next</a>
    </div>
</template>

<style scoped>
    a.disabled { color: #3a3a3c; }
    /*.separator:before { content: '|'; color: #3a3a3c; padding-left: 10px; padding-right: 10px; }*/
</style>
