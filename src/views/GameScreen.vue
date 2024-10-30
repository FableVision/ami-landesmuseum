<template>
    <div class="main-content">
        <div style="height: 70px;"></div>
        <div v-if="view==='question'" class="flex-column">
            <div v-if="questionDisplayMode === 'correct'" class="flex-column">
                <img class="large-correct-symbol" src="@/assets/png/check.png">
                <h4>Richtig!</h4>
            </div>
            <div v-if="gamePhase==='intro'" class="flex-column">
                <span v-if="questionDisplayMode === 'correct'" > {{ largeCorrectText }}</span>
                <div style="height:25px"></div>
                <div v-if="questionDisplayMode === 'question'" class="basic-vertical-flex" style="gap: 10px">
                    <span  style="margin-left: 20px; margin-right: 20px" class="question-text"> {{leadingText}} </span>
                    <div style="height: 25px;"></div>
                    <h4 style="margin-left: 20px; margin-right: 20px" > {{ questionText }}</h4>
                </div>
                <div class="language-answer-section">
                    <AnswerOption 
                        v-for="option in firstQuestionOptions"
                        :text="option.text"
                        :correct="option.correct"
                        :width="option.width"
                        :answerIndex="option.answerIndex"
                        :forceClass="option.forceClass"
                        @correct="handleIntroQuestionCorrect">
                    </AnswerOption>
                </div>
                <div style="height: 50px;"></div>
                <button v-if="questionDisplayMode==='correct'"
                    class="confirm-button white-button"
                    @click="advance">Weiter
                </button>
            </div>
            <div v-if="gamePhase==='game' && answerQuestionPhase ==='search'" class="flex-column">
                <div style="height:25px"></div>
                <span>Finde das Objekt im...</span>
                <br>
                <span><b>{{eventList[currentEventIndex].physicalDirection}}</b></span>
                <div style="height:25px"></div>
                <img class="correct-img" :src="'src/assets/jpg/' + eventList[currentEventIndex].thumbnailFileName">
                <div style="height: 50px;"></div>
                <button 
                    class="confirm-button white-button"
                    @click="found">Gefunden!
                </button>
            </div>
            <div v-if="gamePhase==='game' && answerQuestionPhase !== 'search'" class="flex-column">
                <div class="basic-vertical-flex" style="gap: 10px; margin: 0 50px">
                    <h4 v-if="answerQuestionPhase==='question'" style="text-align: center;"> {{ eventList[currentEventIndex].closelookingPrompt }}</h4>
                    <p v-if="answerQuestionPhase==='correct'" style="text-align: center;"> {{ eventList[currentEventIndex].closelookingFeedback }}</p>
                    <p v-if="answerQuestionPhase==='info'" style="text-align: center; white-space: pre-wrap;"> {{ eventList[currentEventIndex].closelookingMoreInfo }}</p>
                    <div v-if="answerQuestionPhase!=='info'" class="close-look-answer-list">
                        <AnswerOption 
                            v-for="(answer, index) in gameQuestionAnswers"
                            :text="answer.text"
                            :correct="answer.correct"
                            :width="300"
                            :answerIndex="index"
                            :forceClass="answer.forceClass"
                            @correct="handleGameQuestionCorrect">
                        </AnswerOption>
                        <div style="height: 50px;"></div>
                        <button v-if="answerQuestionPhase==='correct'"
                            class="confirm-button white-button"
                            @click="goToInfo">Weiter
                        </button>
                    <div style="height: 50px;"></div>
                </div>
                <button v-if="answerQuestionPhase==='info'"
                    class="confirm-button white-button"
                    @click="nextQuestion">Nächste Frage
                </button>
                </div>
            </div>
        </div>
        <div v-if="view==='timeline'" class="flex-column">
            <div v-if="showTimelineIntro" class="home-dialog-base">
                <div class="home-dialog-container">
                    <h1>Zeitstrahl</h1>
                    <span>Fünf Objekte in der Ausstellung werden dir helfen, die wunderbar komplizierte Geschichte zu ordnen.
                        <br><br>Platziere das Object auf dem Zeitstrahl und finde mehr heraus.</span>
                    <button class="confirm-button black-button home-dialog-confirm" 
                        @click="showTimelineIntro=false; showTimelinePopup=true">Weiter</button>
                </div>
            </div>
            <div v-if="!showTimelinePopup" class="timeline-header">
                <img class="timeline-header-image" :src="'src/assets/jpg/' + eventList[currentEventIndex].thumbnailFileName">
                <div class="timeline-header-text-area">
                    <h5 style="text-align: left; margin: 10px 0">Runde {{ currentEventIndex + 1 }}</h5>
                    <h3 style="text-align: left; margin: 10px 0;">{{ eventList[currentEventIndex].title }}</h3>
                </div>
            </div>
            <div v-if="showTimelinePopup" class="timeline-popup-background">
                <div class="timeline-popup-container">
                    <h2 class="timeline-popup-round-text">Runde {{ currentEventIndex + 1 }}</h2>
                    <img class="timeline-popup-img" :src="'src/assets/jpg/' + eventList[currentEventIndex].thumbnailFileName">
                    <h3 class="timeline-popup-text">{{ eventList[currentEventIndex].title }}</h3>
                    <p class="timeline-popup-text">{{ eventList[currentEventIndex].timelinePrompt }}</p>
                    <button class="confirm-button black-button timeline-popup-button"
                        @click="showTimelinePopup = false;">
                        Platzieren
                    </button>
                </div>
            </div>
            <div style="height: 90px;"></div>
            <div v-if="!showTimelinePopup" class="timeline">
                <div class="timeline-line"></div>
                <TimelineItem v-for="element in timelineItems" 
                    :mode="element.mode" 
                    :data="element.data"
                    @onslotclick="slotClickHandler">
                </TimelineItem>
            </div>
        </div>
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

    const firstQuestionOptions = ref([
        { text: 'Schweizerdeutsch', correct: false, width: 175, answerIndex: 0, forceClass: '' },
        { text: 'Deutsch', correct: true, width: 175, answerIndex: 1, forceClass: '' },
        { text: 'Französisch', correct: true, width: 175, answerIndex: 2, forceClass: '' },
        { text: 'Englisch', correct: false, width: 175, answerIndex: 3, forceClass: '' },
        { text: 'Spanisch', correct: false, width: 175, answerIndex: 4, forceClass: '' },
        { text: 'Rätoromanisch', correct: true, width: 175, answerIndex: 5, forceClass: '' },
        { text: 'Isländisch', correct: false, width: 175, answerIndex: 6, forceClass: '' },
        { text: 'Italienisch', correct: true, width: 175, answerIndex: 7, forceClass: '' },
    ]);

    // 'question' or 'timeline'
    const view = ref('question');
    // 'intro' or 'game'
    const gamePhase = ref('intro'); 
    // 'question' or 'correct'
    const questionDisplayMode = ref('question');
    const leadingText = ref('Sieh dich in der Ausstellung um. Du erkennst die Texte in verschiedenen Sprachen.');
    const questionText = ref('Welches sind offizielle Landessprachen?');
    const largeCorrectText = ref('Richtig!! Aber weshalb? Es ist kompliziert...');

    // Timeline
    const showTimelineIntro = ref(true);
    const showTimelinePopup = ref(false);

    const timelineStartCap = {
        mode: 'cap',
        data: {
            year: '1000 n. Chr.'
        }
    };
    const timelineEndCap = {
        mode: 'cap',
        data: {
            year: '2000 n. Chr.'
        }
    };

    const timelineSlot = {
        mode: 'slot',
        data: {
            slotIndex: 0
        }
    }

    const timelineItems = ref([]);
    const currentEventIndex = ref(0);
    const eventList = [];

    // 'search', 'question', 'correct', 'info'
    const answerQuestionPhase = ref('search');
    const gameQuestionAnswers = ref([]);

    let introQuestionsRight = 0;
    let canPlaceOnTimeline = true;

    onMounted(()=>{
        allText.forEach(question => {
            eventList.push(question);
        });

        buildTimeline();
    });

    function handleIntroQuestionCorrect(){
        introQuestionsRight++;
        if(introQuestionsRight >= 4){
            questionDisplayMode.value = 'correct';
            firstQuestionOptions.value.forEach(element=> {
                if(element.correct){
                    element.forceClass = 'selected';
                }
                else{
                    element.forceClass = 'greyed';
                }
            });
        }
    }

    function advance(){
        if(gamePhase.value === 'intro'){
            gamePhase.value = 'game';
            view.value = 'timeline';
            return;
        }
    }

    function found(){
        answerQuestionPhase.value = 'question';
        questionDisplayMode.value = 'question';

        const csv = eventList[currentEventIndex.value].closelookingAnswers.split('|');
        const shuffledCSV = [...csv];
        shuffle(shuffledCSV);
        gameQuestionAnswers.value = [];
        shuffledCSV.forEach((element, index) => {
            const answer = {
                text: element.trim(),
                correct: element === csv[0],
                forceClass: ''
            }
            gameQuestionAnswers.value.push(answer);
        });
    }

    function goToInfo(){
        answerQuestionPhase.value = 'info';
    }

    function nextQuestion(){
        if(currentEventIndex.value === 4){
            router.push('/end');
            return;
        }

        currentEventIndex.value++;
        answerQuestionPhase.value = 'search';
        view.value = 'timeline';
        showTimelinePopup.value = true;
        buildTimeline();
    }

    function handleGameQuestionCorrect(){
        questionDisplayMode.value = 'correct';
        answerQuestionPhase.value = 'correct';
        gameQuestionAnswers.value.forEach(element => {
            if(element.correct){
                element.forceClass = 'selected';
            }
            else{
                element.forceClass = 'greyed';
            }
        });
    }

    function buildTimeline(){
        timelineItems.value = [timelineStartCap];
        let currentIndex = 1;

        const idedEvents = eventList.slice(0, currentEventIndex.value);
        idedEvents.sort(dateSort);
        console.log(idedEvents);

        for (let index = 0; index < idedEvents.length; index++) {
            const element = idedEvents[index];
            const newSlot = JSON.parse(JSON.stringify(timelineSlot));
            newSlot.data.slotIndex = currentIndex++;
            timelineItems.value.push(newSlot);
            timelineItems.value.push(getDisplayEvent(element));
            currentIndex++;
        }
        const newSlot = JSON.parse(JSON.stringify(timelineSlot));
        newSlot.data.slotIndex = currentIndex;
        timelineItems.value.push(newSlot);
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

    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    function dateSort(a, b){
        return Number(a.date) - Number(b.date);
    }

    function slotClickHandler(slotIndex){
        if(!canPlaceOnTimeline) return;

        let correct = true;
        const currentPlacing = eventList[currentEventIndex.value];
        for(let i = 0; i < timelineItems.value.length; i++){
            const element = timelineItems.value[i];
            if(element.mode !== 'event') continue;
            if(i == slotIndex) continue;

            if(i < slotIndex){
                if(element.data.year > currentPlacing.date){
                    correct = false;
                    break;
                }
            }
            else{
                if(element.data.year < currentPlacing.date){
                    correct = false;
                    break;
                }
            }
        }

        const displayEvent = getDisplayEvent(eventList[currentEventIndex.value]);
        displayEvent.data.correct = correct ? 'correct' : 'incorrect';
        timelineItems.value[slotIndex] = displayEvent;

        canPlaceOnTimeline = false;
        setTimeout(() => {
            delayedResponse(correct, slotIndex)
        }, 1500);
    }

    function delayedResponse(correct, slotIndex){
        canPlaceOnTimeline = true;
        if(correct){
            if(currentEventIndex.value === 4){
                eventList[4].thumbnailFileName = 'map.jpg';
            }

            const displayEvent = getDisplayEvent(eventList[currentEventIndex.value]);
            displayEvent.data.correct = ''
            timelineItems.value[slotIndex] = displayEvent;

            // Go to the 'correct' screen
            view.value = 'question';
            questionDisplayMode.value = 'correct';
        }
        else{
            const newSlot = JSON.parse(JSON.stringify(timelineSlot));
            newSlot.data.slotIndex = slotIndex;
            timelineItems.value[slotIndex] = newSlot;
        }
    }

</script>