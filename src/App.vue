<template>
  <nav class="nav-bar">
    <button 
      v-if="showHomeButton"
      class="home-button" 
      @click="showBack = true">
      <img 
        class="home-button-image" 
        src="@/assets/png/home.png">
    </button>
  </nav>
  <div 
    v-if="showBack"
    class="home-dialog-base">
      <div class="home-dialog-container">
        <h1>Verlassen?</h1>
        <span>Du wirst zur Startseite geleitet.</span>
        <button class="confirm-button black-button home-dialog-confirm" @click="backToTitle">Verlassen</button>
        <button class="home-dialog-exit" @click="showBack = false">
          <img src="@/assets/png/exit.png">
        </button>
      </div>
    </div>
  <RouterView />
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { ref, computed } from 'vue';

    const router = useRouter();
    const route = useRoute()

    const showBack = ref(false);
    const assetImport = import.meta.glob("./assets/**/*");

    const routesWithHomeButton = ['/game'];
    const showHomeButton = computed(() => {
      return routesWithHomeButton.includes(route.path);
    });

    function backToTitle(){
      showBack.value = false;
      router.push('/title');
    }

</script>