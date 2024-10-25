<template>
    <div class="main-content">
        <div class="timeline-header">
            <h1 class="timeline-complete-text">Timeline complete!</h1>
        </div>
        <div style="height: 150px;"></div>
        <p class="timeline-end-text">So there you have it! Why are there four languages in Switzerland? Well, it’s complicated - and each of the four languages has been spoken for hundreds of years. Today Switzerland is multilingual. In addition to the four official languages, English, Portuguese and Albanian are spoken most frequently.</p>
        <div class="timeline">
            <div class="timeline-line"></div>
            <TimelineItem v-for="element in timelineItems" 
                :mode="element.mode" 
                :data="element.data">
            </TimelineItem>
        </div>
        <button class="confirm-button black-button" @click="router.push('/title')">Return to start</button>
        <div style="height: 80px;"></div>
    </div>
    <RouterView />
  </template>

<script setup>
    import { onMounted } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import allText from '../text/text.json';
    import AnswerOption from '../components/AnswerOption.vue';
    import TimelineItem from '../components/TimelineItem.vue';

    const router = useRouter();

    const timelineStartCap = {
        mode: 'cap',
        data: {
            year: '1000 AD'
        }
    };
    const timelineEndCap = {
        mode: 'cap',
        data: {
            year: '2000 AD'
        }
    };

    const timelineItems = ref([]);
    const eventList = [];

    onMounted(()=>{
        allText.forEach(question => {
            eventList.push(question);
        });

        buildTimeline();
    });

    function buildTimeline(){
        eventList.sort(dateSort);

        timelineItems.value.push(timelineStartCap);
        for (let index = 0; index < eventList.length; index++) {
            const element = eventList[index];
            timelineItems.value.push(getDisplayEvent(element));
        }
        timelineItems.value.push(timelineEndCap);
    }

    function getDisplayEvent(jsonObj){
        return {
            mode: 'event',
            data: {
                year: jsonObj.date,
                imageURL: jsonObj.thumbnailFileName
            }
        }
    }

    function dateSort(a, b){
        return Number(a.date) - Number(b.date);
    }

</script>