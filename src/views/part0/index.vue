<template>
    <h2>계산기</h2>

    <div class="small">{{calcNum2}}</div>

    <div class="calc">
        <div class="input">
            {{calcNum}}
        </div>
        <div class="btnWrap">
            
            <div class="calcBtn col2" @click.prevent="ac">AC</div>
            <div class="calcBtn" @click.prevent="percent">%</div>
            <div class="calcBtn" @click.prevent="calculation('division')">÷</div>
            <div class="numberBtnWrap">
                <template v-for="(item, index) in numBtn" :key="index">
                <div class="calcBtn" :class="{'col2': item == 0}" @click.prevent="numClick(item)" >{{item}}</div>
                </template>
                <div class="calcBtn" @click.prevent="decimal">.</div>
            </div>
            <div class="rightBtn">
                <div class="calcBtn" @click.prevent="calculation('multiply')">x</div>
                <div class="calcBtn" @click.prevent="calculation('subtract')">-</div>
                <div class="calcBtn" @click.prevent="calculation('plus')">+</div>
                <div class="calcBtn" @click.prevent="result">=</div>

            </div>
        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue'


let numBtn = ref([]);
for(let i = 9; i >= 0; i--){
    numBtn.value.push(i);
}

let calcNum = ref('0');
let calcNum2 = ref('');
let calcBtn = false;
let calcBtnVal = '';

const numClick = (e) => {
    if (calcBtn){
        calcNum2.value += ''+e
    } else{
        if(calcNum.value == '0'){
            calcNum.value = e;
            
        } else{
            calcNum.value += ''+e
        }
    }
}

const calculation = (e) =>{
    calcBtn = true;
    calcBtnVal = e;
}

const result = () =>{
    if(calcBtnVal == 'plus'){
        calcNum.value = Number(calcNum.value) + Number(calcNum2.value);
    } else if (calcBtnVal == 'subtract'){
        calcNum.value = Number(calcNum.value) - Number(calcNum2.value);
    } else if (calcBtnVal == 'multiply'){
        calcNum.value = Number(calcNum.value) * Number(calcNum2.value);
    } else if (calcBtnVal == 'division'){
        calcNum.value = Number(calcNum.value) / Number(calcNum2.value);
    }
    calcNum2.value = 0;
    calcBtn = false;
    calcBtnVal = ''
}

const decimal = () => {
    let currentNum = calcNum.value;
    console.log(currentNum)
    if(currentNum.indexOf('.') === -1){
        calcNum.value += ''+e
    }
}

const percent = () => {
    calcNum.value = Number(calcNum.value) * Number(0.01);
}

const ac = () =>{
    calcNum.value = 0;
}

</script>

<style>
.calc {background: #eee; padding:20px; width:270px; border-radius: 20px;}
.calc .input {width:100%; padding:0 5px; margin-bottom:5px;
border-radius: 5px; text-align: right; line-height: 2.3; color:#888; font-size:25px; font-weight: bold;}
.calc .btnWrap { display: flex; flex-wrap:wrap; justify-content: space-between;}
.calc .numberBtnWrap { display: flex; flex-wrap:wrap; justify-content: space-between; width:170px}
.calc .rightBtn {display: flex; flex-direction: column;}
.calc .calcBtn {display:flex; align-items: center; justify-content:center; 
    width:50px; height:50px; margin:5px 0;
    background:  linear-gradient(135deg, rgba(230, 230, 230, 1) 0%, rgba(246, 246, 246, 1) 100%); 
    box-shadow: 2px 3px 5px rgba(150, 150, 150, 0.3), -2px -3px 5px rgba(255, 255, 255, 0.7); 
    border-radius: 56px;
    cursor: pointer; color:#888; font-size:20px;}
.calc .calcBtn.col2 {width:110px;}
</style>