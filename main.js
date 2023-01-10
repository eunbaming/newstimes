let news = []

const getLatesNews = async()=>{
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`)
  let header = new Headers({"x-api-key" : "iKfZoEfzCbBDreMwv940ewY4kxcLZ6XCoBeUgUZFYQw"})
  let response = await fetch(url,{headers : header})
  let data = await response.json()
  console.log("data는", data)
  news = data.articles
  render()
}
getLatesNews()

const render = ()=>{
  let newsHTML = ""
  newsHTML = news
  .map((item)=>{
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