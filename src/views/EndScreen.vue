<template>
    <div class="main-content">
        <div class="timeline-header">
            <h1 class="timeline-complete-text">Timeline complete!</h1>
        </div>
        <div style="height: 150px;"></div>
        <p class="timeline-end-text">It can be challenging to visualize just how many lives London Town has had through its history while walking through our quiet 23-acre site. We hope that this game has helped you to see London Town in a new light.</p>
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
    import { onMounted, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import TimelineItem from '../components/TimelineItem.vue';
import allText from '../text/text.json';

    const router = useRouter();

    const timelineStartCap = {
        mode: 'cap',
        data: {
            year: '1600 AD'
        }
    };
    const timelineEndCap = {
        mode: 'cap',
        data: {
            year: '2025 AD'
        }
    };

    const timelineItems = ref([]);
    const eventList = [];

    onMounted(()=>{
        const items = window.history.state.items;
        // console.log("Items", items);

        if (items) {
            eventList.push(...items.slice(0, 5));
        }
        else {  // fallback in case user navigates to end screen without having answered anything
            allText.forEach(question => {
                eventList.push(question);
            });
        }

        buildTimeline();
    });

    function buildTimeline(){
        // console.log("end timeline, event list:", eventList);
        
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