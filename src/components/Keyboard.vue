<script setup>
import gameStore from '@/stores/gameStore'
import { inject } from "vue"
import { Fireworks } from 'fireworks-js'

const toast = inject("toast")
const container = document.querySelector('.fireworks-container')
const fireworks = new Fireworks(container, { /* options */ })

// const emits = defineEmits(['enter-key'])

const enterKey = (key) => {
    if (key == 'Enter') {
        if (!gameStore.currentRowHasSpace()) {
            const res = gameStore.submitRow()
            if (res == 'Success')
            { 
                toast.success(res, { position: "bottom", pauseOnHover: false })
                fireworks.start()
                setTimeout(() => fireworks.stop(),4000)
            } else if (res == 'Next') {} // nothing to toast
            else {
                toast.show(res, { position: "bottom", pauseOnHover: false })
            }
            return
        } 
        return // still space left in current row
    }
    if (key == 'Backspace') {
        gameStore.backspace()
        return
    }
    //if (key === 'enter' || key === 'back-space') return // handle this later
    if (gameStore.currentRowHasSpace()) {
        gameStore.addLetter(key)
    }
    // emits('enter-key', key)
}

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const topLetters = 'qwertyuiop'
const midLetters = 'asdfghjkl'
const lowLetters = 'zxcvbnm'

document.onkeydown = function(e) {
    if (e.key === 'Enter' || e.key === 'Backspace') {
        enterKey(e.key)
        return
    }

    // not a regular letter, so do nothing
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    if (!alphabet.includes(e.key))
        return

    // normal letter
    enterKey(e.key)
}
</script>

<template>
    <div class="rows">
        <div class="row">
            <button v-for="i in topLetters.length" @click.prevent="enterKey(topLetters[i-1])" :key="i">{{topLetters[i-1]}}</button>
        </div>
        <div class="row">
            <div class="f-pt-5"></div>
            <button v-for="i in midLetters.length" @click.prevent="enterKey(midLetters[i-1])" :key="i">{{midLetters[i-1]}}</button>
            <div class="f-pt-5"></div>
        </div>
        <div class="low row">
            <button class="f-1-pt-5" @click.prevent="enterKey('Backspace')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                </svg>                
            </button>            
            <button v-for="i in lowLetters.length" @click.prevent="enterKey(lowLetters[i-1])" :key="i">{{lowLetters[i-1]}}</button>
            <button class="enter f-1-pt-5" @click.prevent="enterKey('Enter')">enter</button>
        </div>    
    </div>    
</template>

<style scoped>
    /* helpers */
    .f-pt-5 { flex: 0.5; }
    .f-1-pt-5 { flex: 1.5; }

    .rows { display:grid; margin: 0 8px; gap: 8px; }
    .row { display: flex; }
    button { 
        padding: 5px; text-transform: uppercase; border-radius: 4px;
        height:58px; display:grid; place-items:center; font-weight: bold; 
        color: white; background: #818384; user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0.3);
        border:0;
        /* flex */
        flex:1; margin-right: 6px;
    }
    button:last-of-type { margin: 0 }
    .enter { font-size: 13px;}
</style>
