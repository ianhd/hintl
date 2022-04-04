<script setup>
import wordSvc from '@/services/wordService.js'
import { reactive } from "vue"

const ws = new wordSvc()
const hint = ws.getHint()

const state = reactive({
    hintHtml: ``
})

const closeModal = () => {
    state.hintHtml = ``
}

const revealHint = () => {
    // hint could be raw html to render
    if (hint.includes("html:")) {
        state.hintHtml = hint.substr(5)
        return
    }

    alert(hint)
}
</script>

<template>
    <div class="backdrop" @click="closeModal" v-if="state.hintHtml"></div>
    <div class="modal" v-if="state.hintHtml">
        <div class="modalContents" v-html="state.hintHtml"></div>
    </div>
    <a href="#" v-if="hint" @click.prevent="revealHint()">Hint</a>
</template>

<style scoped>
    a { text-align: right; }
    
.modal { 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background:white;
  padding: 10px;
  border: 1px solid black;
  z-index:1001;
  border-radius:5px;
}
.modalContents {
    width: 300px;
}
.backdrop { 
  /*opacity: var(--backdrop-opacity);*/
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:1000;
  background:white;
}    
</style>
