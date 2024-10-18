<template>
    Main Screen
    <RouterView />
  </template>

<script>
    import { onMounted } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { useRouter } from 'vue-router';
    import { ref } from 'vue'
    import allText from '../text/text.json'

    export default {
        setup() {
            const router = useRouter();

            onMounted(() => {

            });

            
            return {
                
            }
        }
    }

</script>