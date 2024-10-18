<template>
    End Screen
    <RouterView />
</template>

<script>
    import { onMounted } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    export default {
        setup() {
            const router = useRouter();

            onMounted(() => {
                
            });

            function play() {
                router.push('/title');
            }

            return {
                play
            }
        }
    }

</script>