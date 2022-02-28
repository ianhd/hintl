<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const topLetters = 'qwertyuiop'
const midLetters = 'asdfghjkl'
const lowLetters = 'zxcvbnm'

document.onkeypress = function(e) {
    if (!/[a-z]/i.test(e.key))
        return
    doLetter(e.key)
}

const doLetter = (letter) => {
    alert(letter)
}
</script>

<template>
    <div class="top row">
        <a v-for="i in topLetters.length" @click.prevent="doLetter(topLetters[i-1])" href="#" :key="i">{{topLetters[i-1]}}</a>
    </div>
    <div class="mid row">
        <a v-for="i in midLetters.length" @click.prevent="doLetter(midLetters[i-1])" href="#" :key="i">{{midLetters[i-1]}}</a>
    </div>
    <div class="low row">
        <a href="#">enter</a>
        <a v-for="i in lowLetters.length" @click.prevent="doLetter(lowLetters[i-1])" href="#" :key="i">{{lowLetters[i-1]}}</a>
        <a href="#">X</a>
    </div>        
</template>

<style scoped>
    .row { display: grid; gap: 4px; justify-items: center; align-items: center; }
    .top { grid-template-columns: repeat(10,1fr);}
    .mid { margin: 0 20px; grid-template-columns: repeat(9,1fr); }
    .low { grid-template-columns: repeat(7,1fr); }
    .row a { padding: 5px; text-transform: uppercase; }
</style>
