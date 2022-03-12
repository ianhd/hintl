<script setup>

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div class="wrapper">
        <div v-for="i in 6" :key="i" class="row">
            <div v-for="j in 5" :key="j"></div>
        </div>
    </div>
</template>

<style scoped>
.wrapper { width: 330px; margin: 0 auto; display:grid; gap:5px; }
.row { display: inline-flex; gap: 5px; width:100%; }
.row > div { 
    border: 2px solid #3a3a3c; flex: 1; display:grid; 
    place-items: center; height: 60px; font-weight: bold;
    text-transform: uppercase; user-select: none; 
    font-size: 30px; color:white;
}
</style>
