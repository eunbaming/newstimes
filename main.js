let news = []
let page = 1
let total_pages = 0
let menus = document.querySelectorAll(".menus button")
menus.forEach((menu)=>menu.addEventListener("click", (event)=>getNewsByTopic(event)))
let sideMenus = document.querySelectorAll(".side-menu-list button")
sideMenus.forEach((menu)=>menu.addEventListener("click", (event)=>getNewsByTopic(event)))
let searchButton = document.getElementById("search-btn")
let url

document.getElementById("search-input").addEventListener("keyup", (event) => {
  if (event.keyCode === 13){
    getNewsByKeyword(event)
  }
})

function pageReload() {
  location.reload()
}

const getNews = async()=>{
  try {
    let header = new Headers({"x-api-key" : "lo7L8FrJHAJHfobdGclfo38dr6LUzsqhfOABD3ihWl0"})
    url.searchParams.set('page', page) // &page=page
    // console.log(url)
    let response = await fetch(url,{headers : header})
    let data = await response.json()
    console.log("data는", data)
    console.log("response는", response)
    if(response.status == 200){
      if(data.total_hits == 0){
        throw new Error("No matches for your search")
      }
      news = data.articles
      page = data.page
      total_pages = data.total_pages
      render()
      pagination()
    }else {
      throw new Error(data.message)
    }
  }catch(error) {
    console.log("에러 내용은", error.message)
    errorRender(error.message)
  }
}

const getLatesNews = async()=>{
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`)
  getNews()
}

const getNewsByTopic = async(event)=>{
  // console.log(event.target.textContent)
  let topic = event.target.textContent.toLowerCase()
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=${topic}&page_size=10`)
  getNews()
}

const getNewsByKeyword = async()=>{
  let keyword = document.getElementById("search-input").value
  // console.log("keyword", keyword)
  url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=US&page_size=10`)
  getNews()
}

const render = ()=>{
  let newsHTML = ""
  newsHTML = news.map((item)=>{
    return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}">
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>
        ${
          item.summary == null || item.summary == ""
          ?"No Content"
          :item.summary.length > 200
          ?item.summary.substr(0,200) + "..."
          :item.summary
        }
      </p>
      <div>
        ${item.author || "no author"} * ${moment(item.published_date).fromNow()}
      </div>
    </div>
  </div>`
  }).join("")

  document.getElementById("news-board").innerHTML = newsHTML
}

const errorRender = (message)=>{
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}
</div>`

  document.getElementById("news-board").innerHTML = errorHTML
}

const pagination = ()=>{
  let paginationHTML = ``
  let pageGroup = Math.ceil(page / 5)
  let last = pageGroup * 5
  if(last > total_pages){
    last = total_pages
  }
  let first = last - 4 <= 0 ? 1 : last - 4

  if(first >= 6) {
    paginationHTML = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(1)">&lt;&lt;</a>
</li>
  <li class="page-item">
<a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-1})">&lt;</a>
</li>`
  }

  for(let i=first; i<=last; i++){
    paginationHTML += `<li class="page-item ${page===i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
  }

  if(last < total_pages) {
    paginationHTML += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">&gt;</a>
</li>
  <li class="page-item">
<a class="page-link" href="#" aria-label="Next" onclick="moveToPage(total_pages)">&gt;&gt;</a>
</li>`
  }

  document.querySelector(".pagination").innerHTML = paginationHTML
}

const moveToPage = (pageNum)=>{
  page = pageNum
  console.log(page)
  getNews()
}

function openNav(){
  document.getElementById("mySideNav").style.width = "250px"
}
function closeNav(){
  document.getElementById("mySideNav").style.width = "0"
}
function openSearchBox(){
  let searchArea = document.getElementById("search-area")
  if(searchArea.style.display === "inline"){
    searchArea.style.display = "none"
  }else {
    searchArea.style.display = "inline"
  }
}


searchButton.addEventListener("click", getNewsByKeyword)
getLatesNews()
