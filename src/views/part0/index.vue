<template>
    <h2>계산기</h2>
    <div class="calc">
        <div class="input">
            {{calcNum}}
        </div>
        <div class="btnWrap">
            
            <div class="calcBtn" @click.prevent="numClick('AC')">AC</div>
            <div class="calcBtn" @click.prevent="numClick('EC')">EC</div>
            <div class="calcBtn" @click.prevent="numClick('%')">%</div>
            <div class="calcBtn" @click.prevent="numClick('/')">÷</div>
            <div class="numberBtnWrap">
                <template v-for="(item, index) in numBtn" :key="index">
                <div class="calcBtn" :class="{'col2': item == 0}" @click.prevent="numClick(item)" >{{item}}</div>
                </template>
                <div class="calcBtn" @click.prevent="numClick('.')">.</div>
            </div>
            <div class="rightBtn">
                <div class="calcBtn" @click.prevent="numClick('*')">x</div>
                <div class="calcBtn" @click.prevent="numClick('-')">-</div>
                <div class="calcBtn" @click.prevent="numClick('+')">+</div>
                <div class="calcBtn" @click.prevent="numClick('=')">=</div>

            </div>
        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue'

let decimalPont = false
let calcNum = ref('0');
let numBtn = ref([]);
for(let i = 9; i >= 0; i--){
    numBtn.value.push(i);
}

const numClick = (e) => {
    if(calcNum.value == '0'){
        calcNum.value = e;

    } else if(e == '.'){
        let aa = calcNum.value;
        console.log(aa)
        
    } else{
        calcNum.value += ''+e
    }
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