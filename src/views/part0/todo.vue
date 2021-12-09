<template>
    <h2>TODO LIST</h2>
    <div class="todoListWrap">
        <div class="inputBox">
            <input type="text" v-model="inputText" placeholder="일정을 입력하세요">
            <div class="submit" @click.prevent="submit">등록</div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

let inputText = ref(null)
let listItem = reactive({})

listItem.value = localStorage.getItem('todo');

const submit = ()=>{
    localStorage.setItem('todo', inputText);
}

</script>

<style scoped>
.todoListWrap {background: #eee; padding:30px; border-radius: 30px; min-height: 500px;}
.inputBox {display: flex; justify-content: space-between; border-bottom:1px solid #fff; padding-bottom:10px;}
.inputBox [type="text"] {background: transparent; border:0; width:calc(100% - 100px)}
.inputBox [type="text"]:focus {outline: 0; }
.inputBox .submit {width:80px; background:#e1e1e1; text-align: center; font-size:14px;}
</style>