<template>
  <h1>게시판</h1>
  <div class="boardWrap">
    <div class="boardTop">

      <p>total {{cache.length}} post </p>
      <select v-model="listCunt">
        <option value="5" selected> 5개씩 보기</option>
        <option value="10"> 10개씩 보기</option>
        <option value="20"> 20개씩 보기</option>
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
      <li class="page-item" :class="{'disabled' : isBtnFirst}"><a class="page-link" href="#" @click.prevent="pageArrow('first')">First</a></li>
      <li class="page-item" :class="{'disabled' : isBtnPrev}"><a class="page-link" href="#" @click.prevent="pageArrow('prev')">Previous</a></li>
      <template v-for="(item, index) in pageList" :key="`list-${index}`">
        <li class="page-item" :class="{'active' : item == currentPage}"><a class="page-link" href="#" @click.prevent="page(item)">{{item+1}}</a></li>
      </template>
      <li class="page-item" :class="{'disabled' : isBtnNext}"><a class="page-link" href="#" @click.prevent="pageArrow('next')">Next</a></li>
      <li class="page-item" :class="{'disabled' : isBtnLast}"><a class="page-link" href="#" @click.prevent="pageArrow('last')">Last</a></li>
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

const list = ref([]) //보여지는 리스트
const cache = ref([]) //리스트 전체

const listCunt = ref('5') // 한 페이지에 노출될 게시글 개수

let currentPage = ref(0) //현재 페이지
let pageNum = 10 //페이징 갯수
const pageList = ref([]) // 보여지는 페이지 리스트
let totalPage = ref(0); //페이지 숫자

let isBtnFirst = ref(true); 
let isBtnPrev = ref(true); 
let isBtnNext = ref(true); 
let isBtnLast = ref(true); 

const currentPageListStart = () =>{
  return Math.floor(currentPage.value / pageNum) * pageNum
}
// 페이징 
const paging =() => {
  //보여지는 페이지 리셋
  pageList.value = [];

  //몇페이지까지 있는지 확인
  if(cache.value.length % listCunt.value == 0 ){
    totalPage.value = (cache.value.length / listCunt.value) -1
  } else{
    totalPage.value =  Math.ceil(cache.value.length / listCunt.value) -1
  }

  //현재페이지 기준으로 페이징 숫자 넣기
  let pageListStart = currentPageListStart()
  for(let i= 0; i< pageNum; i++){   
    if(totalPage.value >= pageListStart){
      pageList.value.push(pageListStart)
      pageListStart ++;
    }
  }
}


const getList = () =>{
  
  axios.post('https://studyapi.programrush.co.kr/study/getBoardList')
  .then(res => {
    
    const json = res.data
    if(json.result == "success"){
      cache.value = json.data
    }
    list.value = [] //보여지는 게시물 리셋
    
    let listIdx = (listCunt.value * (currentPage.value )); // 보여질 게시물 index
    for(let i= 0; i < listCunt.value; i++ ){       //게시글 수 만큼 루프
      if(cache.value.length > listIdx) { //
        list.value.push(cache.value[listIdx])
        listIdx ++;
      }
    }
    paging()
    pageBtnCheck()

  })  
}

getList()

//페이지 번호 클릭시
const page = (e) =>{
  currentPage.value = e  
  getList()
}

//리스트 갯수 수정시
watch(listCunt,(after, before)  =>{
  currentPage.value = 0
  getList()
})

const pageBtnCheck = () =>{
  isBtnFirst.value = currentPage.value == 0 ? true : false
  isBtnPrev.value = currentPage.value == 0 ? true : false
  
  isBtnNext.value = currentPage.value == totalPage.value ? true : false
  isBtnLast.value = currentPage.value == totalPage.value ? true : false
}

watch(currentPage,(after, before)  =>{
  pageBtnCheck()
})


//페이지 처음/끝/이전/다음 버튼 클릭시
const pageArrow = (e) => {
  let movePage = parseInt(currentPage.value)
  if(e == 'first'){ //처음으로
    movePage = 0
  } else if(e == 'last'){    //마지막
    movePage = totalPage.value
  } else if(e == 'prev'){    //이전  
    movePage = currentPageListStart() - 1    
    movePage < 0 ? movePage = 0 : ''
  } else{//다음
    movePage = currentPageListStart() + 10
    movePage >= totalPage.value ? movePage = totalPage.value : ''
  }
  page(movePage)
}


const write = () => {
  router.push('/ex/board/write')
}

</script>

<style scoped>
.boardWrap {width:80%;}
.boardTop {display:flex; justify-content: space-between; align-items: center; margin-bottom:20px;}
.pagination {text-align:center}
</style>
