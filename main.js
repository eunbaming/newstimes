let news = []
let menus = document.querySelectorAll(".menus button")
menus.forEach((menu)=>menu.addEventListener("click", (event)=>getNewsByTopic(event)))
let searchButton = document.getElementById("search-btn")

const getLatesNews = async()=>{
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`)
  let header = new Headers({"x-api-key" : "riwPQitZ5-hs2euwt5GyQjvarI4srEi9QuaspdpE_KQ"})
  let response = await fetch(url,{headers : header})
  let data = await response.json()
  console.log("data는", data)
  news = data.articles
  render()
}

const getNewsByTopic = async(event)=>{
  // console.log(event.target.textContent)
  let topic = event.target.textContent.toLowerCase()
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=${topic}&page_size=10`)
  let header = new Headers({"x-api-key" : "riwPQitZ5-hs2euwt5GyQjvarI4srEi9QuaspdpE_KQ"})
  let response = await fetch(url,{headers : header})
  let data = await response.json()
  news = data.articles
  render()
}

const getNewsByKeyword = async()=>{
  let keyword = document.getElementById("search-input").value
  // console.log("keyword", keyword)
  let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=US&page_size=10`)
  let header = new Headers({"x-api-key" : "riwPQitZ5-hs2euwt5GyQjvarI4srEi9QuaspdpE_KQ"})
  let response = await fetch(url,{headers: header})
  let data = await response.json()
  news = data.articles
  render()
  console.log("data는", data)
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
