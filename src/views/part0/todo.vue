<template>
    <h2>TODO LIST</h2>
    <div class="todoListWrap">
        <div class="inputBox">
            <input type="text" v-model="inputText" placeholder="일정을 입력하세요" @keydown.enter="submit">
            <div class="submit" @click.prevent="submit">{{submitBtnText}}</div>
        </div>
        <div class="todoList">
            <template v-for="(item,index) in list" :key="`list-${index}`">
            <div class="listItem">
                <div><span>[{{item.date}}]</span> {{item.text}}</div>
                <div>
                    <a href="#" @click.prevent="edite(index)">수정</a>&nbsp;
                    <a href="#" @click.prevent="dele(index)">삭제</a>
                </div>
            </div>
            </template>
        </div>

    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

let list = ref([])
let inputText = ref(null)
let editeMode = false;
let submitBtnText = ref('등록')
let editePost =  0;


const localStorageData = localStorage.getItem('todo');
if(localStorageData !== null){
    list.value = JSON.parse(localStorageData)
}

const submit = ()=>{
    if(inputText.value){    
        if(editeMode){
            list.value[editePost].text = inputText.value
        } else{
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            if(month < 10){
                month = '0' + month;
            }
            let day = date.getDate()
            list.value.push({text:inputText.value, date:`${year}-${month}-${day}`})
        }
        
        localStorage.setItem('todo', JSON.stringify(list.value));
        inputText.value = ''

    } else{        
        alert('내용을 입력하세요')
        return false;
    }
}

const dele = (e) =>{
    list.value.splice(e,1)
    localStorage.setItem('todo', JSON.stringify(list.value));    
}

const edite = (e) =>{
    editeMode = true
    submitBtnText.value = '수정'

    inputText.value = list.value[e].text
    editePost = e;
}

</script>

<style scoped>
.todoListWrap {background: #eee; padding:30px; border-radius: 30px; }
.inputBox {display: flex; justify-content: space-between; border-bottom:1px solid #fff; padding-bottom:10px; margin-bottom: 10px;}
.inputBox [type="text"] {background: transparent; border:0; width:calc(100% - 100px)}
.inputBox [type="text"]:focus {outline: 0; }
.inputBox .submit {width:80px; background:#e1e1e1; text-align: center; font-size:14px;}
.listItem {display:flex; padding:5px 0; justify-content: space-between;}
</style>