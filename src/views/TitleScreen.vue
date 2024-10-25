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
        <span>Why does Switzerland have so many languages? Well,</span>
        <h3>it's complicated...</h3>
        <div style="height: 50px;"></div>
        <button class="confirm-button black-button" @click="router.push('/game')">Begin</button>
    </div>
    <RouterView />
</template>

<script setup>
    import { onMounted } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import allText from '../text/text.json';

    const router = useRouter();

</script>