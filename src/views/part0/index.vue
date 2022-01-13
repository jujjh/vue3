<template>
    <h2>계산기</h2>

    <div class="layout">
        <div class="calc">
            <div class="input">
                <div class="small">{{calcMemoListText}}</div>
                {{calcNum}}
            </div>
            <div class="btnWrap">
                
                <div class="calcBtn" @click.prevent="ac">AC</div>
                <div class="calcBtn" @click.prevent="negative">+/-</div>
                <div class="calcBtn" @click.prevent="percent">%</div>
                <div class="calcBtn" @click.prevent="calculation('/')">÷</div>
                <div class="numberBtnWrap">
                    <template v-for="(item, index) in numBtn" :key="index">
                    <div class="calcBtn" :class="{'col2': item == 0}" @click.prevent="numClick(item)" >{{item}}</div>
                    </template>
                    <div class="calcBtn" @click.prevent="decimal">.</div>
                </div>
                <div class="rightBtn">
                    <div class="calcBtn" @click.prevent="calculation('*')">x</div>
                    <div class="calcBtn" @click.prevent="calculation('-')">-</div>
                    <div class="calcBtn" @click.prevent="calculation('+')">+</div>
                    <div class="calcBtn" @click.prevent="result">=</div>

                </div>
            </div>
        </div>
        <div class="calcMemo">
            <h3>기록</h3>
            <div class="list" v-if="calcMemoList.values.length > 0">
                <template v-for="item in calcMemoList" :key="item">
                <div>{{item}}</div>
                </template>
            </div>
            <div class="list" v-else>
                기록이 없습니다.
            </div>
        </div>
    </div>
    <div class="small">{{calcNum2}}</div>

</template>
<script setup>
import { reactive, ref } from 'vue'

let numBtn = ref([]);
for(let i = 9; i >= 0; i--){
    numBtn.value.push(i);
}

let calcNum = ref('0');
let calcNum2 = ref('');
let calcBtn = false;
let calcBtnVal = '';
let calcMemoListText = ref('');

let calcMemoList = ref([]);

const numClick = (e) => {
    if(calcNum.value == '0'){
        calcNum.value = e;
    } else{
        if(calcBtn){
            calcNum2.value += ''+e
        } else{
            calcNum.value += ''+e
        }
    }
}

const calculation = (e) =>{
    if(calcBtn){
        result();
    } else{
        calcBtn = true;
        calcBtnVal = e;
        calcMemoListText.value = `${calcNum.value}${e}`;         
    }
}

const result = () =>{
    if(calcBtnVal == '+'){
        calcNum.value = Number(calcNum.value) + Number(calcNum2.value);
    } else if (calcBtnVal == '-'){
        calcNum.value = Number(calcNum.value) - Number(calcNum2.value);
    } else if (calcBtnVal == '*'){
        calcNum.value = Number(calcNum.value) * Number(calcNum2.value);
    } else if (calcBtnVal == '/'){
        calcNum.value = Number(calcNum.value) / Number(calcNum2.value);
    }
    calcMemoListText.value += calcNum2.value + '=';
    //calcMemoList.values.push({text: calcMemoListText.value, result: calcNum.value})
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

const negative = () =>{
    calcNum.value = Number(calcNum.value) * -1;
}

const percent = () => {
    calcNum.value = Number(calcNum.value) / Number(100);
}

const ac = () =>{
    calcNum.value = 0;
    calcNum2.value = 0;
    calcBtn = false;
    calcBtnVal = '';
    calcMemoListText.value = '';
}

</script>

<style>
.layout {display:flex;}
.calc {background: rgb(243, 243, 243); padding:20px; width:270px; border-radius: 20px; position:relative; z-index: 10;}
.calc .input {width:100%; padding:0 5px; margin-bottom:5px;
border-radius: 5px; text-align: right; line-height: 2.3; color:#888; font-size:25px; font-weight: bold;  height:70px;}
.calc .input .small {font-size:17px; line-height: 1; font-weight: normal; height:20px;}
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
.calcMemo {width:400px; margin-left:10px; background:#f1f1f1; padding: 20px; border-radius: 20px;}
.calcMemo h3 { font-size:20px; color:#aaa; font-weight: bold; border-bottom:1px solid #ddd; padding-bottom: 10px;}
.calcMemo {}
</style>