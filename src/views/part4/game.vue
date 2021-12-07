<template>
    <div id="game">
        <div class="board">
            <div class="wrap-center">
                <transition-group name="cards" class="wrap" tag="ul">
                    <li class="card" v-for="(item, i) in cards" :key="'card' + item.key" @click="openCard(i)">
                        <div :class="['item front', {open: item.isOpened}]">
                            <i class="fas fa-question" />
                        </div>
                        <div :class="['item back', {open: item.isOpened}, {pair: item.isPair}]">
                            <img :src="require(`@/assets/imgs/${item.img}-logo.png`)" />
                        </div>
                    </li>
                </transition-group>
            </div>

            <div class="score">
                도전 횟수: {{score}}
            </div>

            <div class="complete" v-if="scoreBoard">
                <div class="complete-board">
                    <p>총 도전 횟수: {{score}}</p>
                    <p>플레이 시간: {{completeTime}}</p>
                    <p class="my-0">
                        <slot-btn type="secondary" @click="close">닫기</slot-btn>&nbsp;
                        <slot-btn type="success" @click="restart">다시 시작하기</slot-btn>
                    </p>
                </div>
            </div>
        </div>

        <p>
            <template v-if="isAuto">
                <slot-btn type="warning" @click="autoStop">자동 진행 중단</slot-btn>
            </template>
            <template v-else>
                <slot-btn type="primary" @click="start" v-if="!isStart">시작하기</slot-btn>
                <template v-else>
                    <slot-btn type="danger" @click="cancel">취소하기</slot-btn>&nbsp;
                    <slot-btn type="info" @click="autoPlay">자동 진행</slot-btn>
                </template>
            </template>
        </p>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import slotBtn from '@/components/slotBtn'

const _ = require('lodash')
const util = inject('util')

const logos = ['vue', 'react', 'angular', 'nodejs', 'webpack', 'js']

let isStart = ref(false)
let isComplete = ref(false)
let cards = ref([])
let openedCount = ref(0)
let openedIndex = ref([])
let score = ref(0)
let scoreBoard = ref(false)
let completeTime = ref('')

let isAuto = ref(false)
let pairCount = 0, startTime = 0, endTime = 0
let openComplete = []

const setCards = () => {
    cards.value = []

    for (let i = 0; i < 12; i++) {
        cards.value.push({img: logos[i % 6], isOpened: true, isPair: false, key: i})
    }
}

const start = async () => {
    close()

    for (let i = 0; i < cards.value.length; i++) {
        cards.value[i].isOpened = false
        cards.value[i].isPair = false

        await util.delay(100)
    }

    await util.delay(600)

    await shuffle()

    startTime = new Date().getTime()
    isStart.value = true
}

const cancel = async () => {
    close()

    for (let i = 0; i < cards.value.length; i++) {
        cards.value[i].isOpened = true
        cards.value[i].isPair = false

        await util.delay(100)
    }
}

const restart = () => {
    close()
    start()
}

const close = () => {
    pairCount = 0
    openComplete = []
    score.value = 0
    openedCount.value = 0
    openedIndex.value = []
    scoreBoard.value = false
    isStart.value = false
    isComplete.value = false
}

const openCard = async (index) => {
    if (openedCount.value < 2 && !cards.value[index].isOpened && isStart.value) {
        openedCount.value++
        cards.value[index].isOpened = true
        openedIndex.value.push(index)

        await checkPair()
    }
}

const checkPair = async () => {
    if (openedCount.value >= 2) {
        score.value++

        let index1 = openedIndex.value[0], index2 = openedIndex.value[1]

        if (cards.value[index1].img == cards.value[index2].img) {
            await util.delay(500)

            cards.value[index1].isPair = true
            cards.value[index2].isPair = true

            pairCount++

            openComplete.push(index1)
            openComplete.push(index2)
        } else {
            await util.delay(1000)

            cards.value[index1].isOpened = false
            await util.delay(100)
            cards.value[index2].isOpened = false
        }

        openedIndex.value = []
        openedCount.value = 0
    }

    if (pairCount >= 6) {
        endTime = new Date().getTime()
        let completeDate = new Date(endTime - startTime)

        completeTime.value = `${completeDate.getMinutes()}:${completeDate.getSeconds()}`
        scoreBoard.value = true
        isAuto.value = false
    }
}

const shuffle = async () => {
    for (let i = 0; i < 24; i++) {
        let index = i % 12
        let num = cards.value[index]
        let changeIndex = -1

        do {
            changeIndex = _.random(0, cards.value.length - 1)
        } while (changeIndex == index)

        let changeNum = cards.value[changeIndex]

        cards.value[index] = changeNum
        cards.value[changeIndex] = num

        await util.delay(250)
    }
}

const autoPlay = async () => {
    isAuto.value = true
    let openIndex = []

    while (pairCount < 6 && isAuto.value) {
        let index = _.random(0, cards.value.length - 1)

        if (openIndex.indexOf(index) == -1 && openComplete.indexOf(index) == -1) {
            if (openIndex.length >= 2) {
                openIndex = []
            }

            openIndex.push(index)
            await openCard(index)
        }
    }
}

const autoStop = () => {
    isAuto.value = false
}

setCards()
</script>

<style scoped>
#game {text-align: center;}
#game .board {
    display: inline-block; width: 80vw; background-color: #000; padding: 25px 25px 0 25px; margin-bottom: 10px;
    background-image: url('../../assets/imgs/bg.jpg'); background-repeat: no-repeat; background-size: cover;
    background-position: center; text-align: center; position: relative;
}
#game .board .score {position: absolute; left: 20px; top: 10px; color: #fff; font-size: 30px; font-weight: 700}
#game .complete {
    position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-color: rgba(0, 0, 0, .5);
    display: flex; flex-direction: row; align-items: center; justify-content: center;
}
#game .complete-board {width: 300px; background-color: #fff; border-radius: 20px; padding: 20px; font-size: 20px;}
#game .board .wrap-center {display: inline-block}
.wrap {
    width: 820px; height: 820px;
    display: flex; flex-wrap: wrap; flex-direction: row;
    justify-content: space-between;
    padding: 0; margin: 0; list-style: none;
}
.card {
    position: relative; width: 180px; height: 240px; perspective: 600px;
    border-radius: 10px; border: 0; background-color: transparent;
}
.card .item {border-radius: 10px; transition: all .5s; backface-visibility: hidden;}
.card .front {
    position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-color: gold;
    color: #fff; font-size: 80px; display: flex; flex-direction: row; align-items: center; justify-content: center;
    box-sizing: border-box; transform: rotateY(0deg); box-shadow: 1px 2px 4px #000;
}
.card .front.open {transform: rotateY(180deg)}
.card .back {
    width: 100%; height: 100%; background-color: #fff; transform: rotateY(-180deg); overflow: hidden;
    display: flex; flex-direction: row; align-items: center; justify-content: center; box-sizing: border-box; box-shadow: 1px 2px 4px #000;
}
.card .back img {width: 70%; height: auto;}
.card .back.open {transform: rotateY(0deg)}
.card .back.pair {background-color: gold}
.cards-move {transition: transform .2s ease}
</style>