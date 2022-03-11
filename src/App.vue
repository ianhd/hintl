<script setup>
import Keyboard from './components/Keyboard.vue'
</script>

<template>
    <div class="main">
        <Keyboard msg="You did it!" />
    </div>
</template>

<style>
@import './assets/base.css';

#app {
}

.main { width: 500px; margin: 0 auto; }

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
