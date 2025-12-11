<template>
    <div class="pre-loader">
        <img src="@/assets/jpg/1291.jpg">
        <img src="@/assets/jpg/1481.jpg">
        <img src="@/assets/jpg/1504.jpg">
        <img src="@/assets/jpg/1848.jpg">
        <img src="@/assets/jpg/1938.jpg">
        <img src="@/assets/jpg/map.jpg">
        <img src="@/assets/png/check.png">
        <img src="@/assets/png/exit.png">
        <img src="@/assets/png/home.png">
        <img src="@/assets/png/wrong.png">
    </div>
    <div class="main-content center-content-vertically">
        <span>Play this game to dive even deeper into some of the stories you'll find in our London Town exhibit!</span>
        <!-- <h3>Es ist kompliziert...</h3> -->
        <div style="height: 50px;"></div>
        <button class="confirm-button black-button" @click="router.push('/game')">Begin</button>
    </div>
    <RouterView />
</template>

<script setup>
    import { RouterView, useRouter } from 'vue-router';

    const router = useRouter();

</script>