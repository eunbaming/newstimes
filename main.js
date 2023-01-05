// let news = []

// const getLatesNews = async()=>{
//   let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business`)
//   let header = new Headers({"x-api-key" : "iKfZoEfzCbBDreMwv940ewY4kxcLZ6XCoBeUgUZFYQw"})
//   let response = await fetch(url,{headers : header})
//   let data = await response.json()
//   console.log("data는", data)
//   news = data.articles
// }
// getLatesNews()

function openNav(){
  document.getElementById("mySideNav").style.width = "300px"
}
function closeNav(){
  document.getElementById("mySideNav").style.width = "0"
}