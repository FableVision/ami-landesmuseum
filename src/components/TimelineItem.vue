<template>
    <div class="basic-vertical-flex timeline-item">
        <div v-if="mode==='cap'" class="timeline-cap-container basic-vertical-flex">
            <span class="timeline-date">{{ data.year }}</span>
        </div>
        <div v-if="mode==='event'" class="basic-vertical-flex" style="height: 200px;">
            <img class="timeline-picture" :src="imageSrc">
            <img v-if="data.correct === 'correct'" class="timeline-correct" src="@/assets/png/check.png">
            <img v-if="data.correct === 'incorrect'" class="timeline-correct" src="@/assets/png/wrong.png">
            <div v-if="data.correct !== 'incorrect'" class="timeline-cap-container basic-vertical-flex" style="margin-bottom: 10px; margin-top: -10px;">
                <span class="timeline-date"> {{ data.year }}</span>
            </div>
        </div>
        <div v-if="mode==='slot'" class="basic-vertical-flex" style="height: 200px;">
            <button @click="onSlotClick" class="timeline-slot"></button>
        </div>
    </div>
</template>
  
  <script setup>
    import { defineEmits, computed, ref } from 'vue'

    const emit = defineEmits(['onslotclick'])

    const imageSrc = computed(()=>{
        return 'src/assets/jpg/' + props.data.imageURL;
    });
    
    const props = defineProps({
        mode: { // cap, event, or slot
            type: String,
            default: 'item' 
        },
        data: {
            type: Object
        }
    })

    function onSlotClick(){
        emit('onslotclick', props.data.slotIndex);
    }
  </script>