<template>
    <button class="answer-option-button" 
            :style="style"
            :class="classText"
            @click="handleClick">
        {{text}}
        <img v-if="showCorrect==='wrong' && !forceClass" class="answer-option-symbol" src="@/assets/png/wrong.png">
        <img v-if="showCorrect==='correct' && !forceClass" class="answer-option-symbol" src="@/assets/png/check.png">
    </button>
  </template>
  
  <script setup>
    import { defineEmits, computed, ref } from 'vue'
    
    const props = defineProps({
        text: {
            type: String,
            default: 'Button Text'
        },
        correct: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 200
        },
        answerIndex: {
            type: Number,
            default: 0,
        },
        forceClass: {
            type: String,
            default: ''
        }
    })

    
    const style = computed(()=>{
        return 'width: ' + props.width + 'px';
    });

    let baseClassText = ref('');
    const classText = computed(()=>{
        if(props.forceClass === ''){
            return baseClassText.value;
        }
        else{
            return props.forceClass
        }
    });

    const showCorrect = ref('none');

    const emit = defineEmits(['correct'])

    let correctAnswered = false;
  
    const handleClick = () => {
        if(props.correct){
            baseClassText.value = 'selected';
            showCorrect.value = 'correct';
            if(!correctAnswered){
                correctAnswered = true;
                setTimeout(() => {
                    showCorrect.value = '';
                }, 1500);
                emit('correct');
            }
        }
        else{
            showCorrect.value = 'wrong';

            setTimeout(() => {
                showCorrect.value = '';
            }, 1500);
        }
    }
  </script>