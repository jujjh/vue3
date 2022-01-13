<template>
  <h1>게시판</h1>
  <div class="boardWrap">
    <div class="boardTop">

      <p>total {{cache.length}}</p>
      <select v-model="listCunt">
        <option value="2" selected> 2개씩 보기</option>
        <option value="1"> 1개씩 보기</option>
        <option value="3"> 3개씩 보기</option>
      </select>
    </div>
    <div>
      <table class="table">
        <colgroup>
          <col width="70">
          <col width="">
          <col width="120">
          <col width="120">
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length > 0">
          <tr v-for="(item, idx) in list" :key="`list-${idx}`">
            <td>{{item.idx}}</td>
            <td>{{item.title}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.regDate.substr(0,10)}}</td>
          </tr>
          </template>
        </tbody>
      </table>
    </div>
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#" @click.prevent="pageArrow('first')">First</a></li>
      <li class="page-item"><a class="page-link" href="#" @click.prevent="pageArrow('prev')">Previous</a></li>
      <template v-for="(item, index) in totalPage" :key="`list-${index}`">
        <li class="page-item" :class="{'active' : index+1 == currentPage}"><a class="page-link" href="#" @click.prevent="page(index + 1)">{{index+1}}</a></li>
      </template>
      <li class="page-item"><a class="page-link" href="#" @click.prevent="pageArrow('next')">Next</a></li>
      <li class="page-item"><a class="page-link" href="#" @click.prevent="pageArrow('last')">Last</a></li>
    </ul>
    <div>
      <a href="#" @click.prevent="write" class="btn btn-sm btn-primary">작성</a>
    </div>
    
  </div>
</template>

<script setup>
import router from '@/router'
import axios from 'axios'
import {ref, watch} from 'vue'


const write = () => {
  router.push('/ex/board/write')
}

const list = ref([])
const cache = ref([])
let currentPage = ref(1)

const listCunt = ref('2') // 한 페이지에 노출될 게시글 개수

const totalPage = ref()
let cachePage = 0;


// 페이징 
const paging =() => {
  if(cache.value.length % listCunt.value == 0 ){
    cachePage = cache.value.length / listCunt.value
  } else{
    cachePage =  parseInt(cache.value.length / listCunt.value) + 1
  }

  if(cachePage > 10){
    totalPage.value = 10;
  } else{
    totalPage.value = cachePage
  }
}


const getList = () =>{
  
  axios.post('https://studyapi.programrush.co.kr/study/getBoardList')
  .then(res => {
    
    const json = res.data
    if(json.result == "success"){
      cache.value = json.data
    }
    list.value = []
    
    let listIdx = (listCunt.value * (currentPage.value -1));
    for(let i= 0; i < listCunt.value; i++ ){      
      if(cache.value.length > listIdx) {
        list.value.push(cache.value[listIdx])
        listIdx ++;
      }
    }

    paging()

  })  
}

getList()

//페이지 번호 클릭시
const page = (e) =>{
  currentPage.value = e  
  getList()
}

//리스트 갯수 수정시
watch(listCunt,(a, b)  =>{
  currentPage.value = 1
  getList()
})

//페이지 처음/끝/이전/다음 버튼 클릭시
const pageArrow = (e) => {
  let movePage = currentPage.value

  if(e == 'first'){
    page(1)
  } else if(e == 'last'){    
    page(cachePage)
  } else if(e == 'prev'){    
    currentPage.value == 1 ? movePage = 1 : movePage --
    page(movePage)
  } else{
    currentPage.value == cachePage ? movePage = cachePage : movePage ++
    page(movePage)
  }
}

</script>

<style scoped>
.boardWrap {width:80%;}
.boardTop {display:flex; justify-content: space-between; align-items: center; margin-bottom:20px;}
.pagination {text-align:center}
</style>
