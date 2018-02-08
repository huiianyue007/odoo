<template>
  <div class="container">
    <transition name = 'fade'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<style scoped lang = 'scss'>
  .container{
    height:100vh;
  }
</style>
