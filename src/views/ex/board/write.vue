<template>
  <h1>게시판 작성</h1>

  <div class="wrap">
    <table>
      <tbody>
        <tr>
          <th>제목</th>
          <td><input type="text" placeholder="제목" v-model="title" ref="titleRef" /></td>
        </tr>
        <tr>
          <th>작성자</th>
          <td><input type="text" placeholder="작성자" v-model="userName" ref="userNameRef" /></td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td><input type="password" v-model="pwd" ref="pwdRef" /></td>
        </tr>
        <tr>
          <th>내용</th>
          <td><textarea placeholder="내용을 입력해주세요" v-model="content" ref="contentRef" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <a href="#" class="btn btn-sm btn-secondary" @click.prevent="cancel">취소</a>
    <a href="#" class="btn btn-sm btn-primary" @click.prevent="regist">등록</a>
  </div>
    
</template>

<script setup>
import router from '@/router'
import {ref} from 'vue'
import axios from 'axios'

let title = ref('')
let userName = ref('')
let pwd = ref('')
let content = ref('')
const titleRef = ref()
const userNameRef = ref()
const pwdRef = ref()
const contentRef = ref()

const cancel = () =>{
  router.push('/ex/board/list');

}

const regist = () =>{
  if(!title.value ) {
    alert('제목입력 입력해주세요')
    titleRef.value.focus()
    return
  }
  
  if(!userName.value ) {
    alert('작성자 입력해주세요')
    userNameRef.value.focus()
    return
  }
  
  if(pwd.value.length > 8 ) {
    alert('비밀번호는 8자리 이상 입력해주세요')
    pwdRef.value.focus()
    return
  } 
  
  if(!content.value ) {
    alert('내용 입력해주세요')
    contentRef.value.focus()
    return
  }

  const form = new FormData()

  form.append('title', title.value)
  form.append('userName', userName.value)
  form.append('pwd', pwd.value)
  form.append('content', content.value)

  axios.post('https://studyapi.programrush.co.kr/study/setBoardWrite', form)
  .then(res => {
    console.log(res.data)
    const json = res.data

    if( json.result == 'success') {
      alert('저장')
      router.push('/ex/board/list');
    } else{
      console.log(res.data)

    }
  })

}

</script>

<style scoped>

</style>
