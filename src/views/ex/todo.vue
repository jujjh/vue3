<template>
  <h1>TODO LIST</h1>
  <div class="todo_list_wrap">
    <transition-group :name="listTransition">
    <template v-for="(item, index) in list"   >
    <div class="list_item" v-if="item.state" :key="`list-${item.idx}`">
      <div class="text">
        {{item.text}} 
        <span>{{item.date}}</span>
      </div>
      <div class="btn_wrap">
        <a href="#" @click.prevent="edit(index)">수정</a>
        &nbsp;
        <a href="#" @click.prevent="remove(index)">삭제</a>
      </div>
    </div> 
    </template>
    </transition-group>
  </div>

  <div class="todo_input">
    <input type="text" class="form-control" v-model="content" @keydown.enter="regist">
    <a href="#" class="btn btn-small btn-primary" @click.prevent="regist">{{btnName}}</a>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'

const list = ref([
  { 
      idx:1,
      text:'오늘은 뭐했어요',
      state:true,
      date:'2021-12-01',
  },{ 
      idx:2,
      text:'오늘은 뭐했어요2',
      state:true,
      date:'2021-12-02',
  },{ 
      idx:3,
      text:'오늘은 뭐했어요3',
      state:true,
      date:'2021-12-03',
  },{ 
      idx:4,
      text:'오늘은 뭐했어요4',
      state:true,
      date:'2021-12-04',
  },

])
const content = ref('');
let editMode = ref(false)
let btnName = computed(()=> editMode.value ? '수정' : '등록')
let changeIndex = -1
let listTransition = ref('listIn')

const regist = (evt) => {
  const objDate = new Date()
  const date = `${objDate.getFullYear()}-${objDate.getMonth() + 1}-${objDate.getDate()}`
    
  if(editMode.value){
    list.value[changeIndex].text = content.value
    editMode.value = false
  } else{
    
  listTransition.value = 'listIn'
    list.value.push({
      text:content.value, 
      idx:list.length +1,
      state:true,
      date, 
    })
  }
  content.value= ''
}

const remove = (index) => {
  //list.value.splice(index, 1)
  list.value[index].state = false
  listTransition.value = 'listOut'

}

const edit = (index) => {
  editMode.value = true
  content.value = list.value[index].text
  changeIndex = index
}
</script>

<style scoped>
.todo_list_wrap {display:block;margin-bottom: 30px; }
.todo_list_wrap .list_item { padding:20px; margin-bottom: 5px; background:#f1f1f1; border-radius: 10px; display:flex; align-items: center; justify-content: space-between; border-bottom:1px solid #e0e0e0;}
.todo_list_wrap .list_item:last-child {border-bottom:0px solid #eee;}
.todo_list_wrap .list_item .text {font-size:14px;}
.todo_list_wrap .list_item .text span {font-size:12px; color:#999}
.todo_list_wrap .list_item .btn_wrap {display:flex; justify-content: space-between; }
.todo_list_wrap .list_item .btn_wrap a {font-size:12px; text-decoration: none; color:#777; background: #e0e0e0; display: block; padding:5px 10px; border-radius: 3px;}

.todo_input {display:flex; justify-content: space-between; }
.todo_input .form-control[type="text"] {width:calc(100% - 60px); }

.listIn-enter-from, .listIn-leave-to{transform: translateY(20px); opacity: 0;}
.listIn-enter-active, .listIn-leave-active{transition: all .2s}

.listout-enter-from, .listOut-leave-to{transform: translateX(100%); opacity: 0;}
.listout-enter-active, .listOut-leave-active{transition: all .5s}
</style>