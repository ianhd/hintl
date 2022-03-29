<script setup>
import 'animate.css'
import Keyboard from './components/Keyboard.vue'
import Grid from './components/Grid.vue'

// const keyEntered = (key) => {
//     alert('test' + key)
// }

</script>

<template>
    <div class="main">
        <div class="mt-50 mt-20_m">
            <Grid msg="You did it!" />
        </div>
        <!-- <Keyboard @enter-key="keyEntered" msg="You did it!" /> -->
        <div class="mt-50 mt-20_m">
            <Keyboard msg="You did it!" />
        </div>
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

/* TABLET AND BELOW */
@media screen and (max-width: 499px) {
    .main { width: 100%; }
}
</style>
