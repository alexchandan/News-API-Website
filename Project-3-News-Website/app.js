const accordionNews = document.querySelector('#accordionNews');
// let sources = 'bbc-news';
// let apiKey = 'c37e2ef951bf4f0caf7edba576d573eb'
const newsExpress = async () => {
    try {
        // const res = await fetch(`https://newsapi.org/v2/top-headlines/?sources=${sources}&apiKey=${apiKey}`)
        const res = await fetch(`https://newsapi.org/v2/everything?q=popularity&apiKey=c37e2ef951bf4f0caf7edba576d573eb`)
        const data = await res.json();
        // displaying to the dom.
        let newsHtml = "";
        data.articles.forEach((element, index) => {
            let updateDate = new Date(element['publishedAt']);
            let d = updateDate.getDate();
            let m = updateDate.getMonth();
            let y = updateDate.getFullYear();
            let news = `<div class="card mx-2 my-3" id="card" style="width: 18rem;">
            <a href="${element['url']}"target="_blank"><img src="${element['urlToImage']}" class="card-img-top" alt="..."></a>
            <div class="card-body">
              <h5 class="card-title" id="newsTitle">${element['title']}</h5>
              <p class="card-text">${element['content']}</p>
              <a href="${element['url']}" target="_blank" class="text-danger" id="readMoreBtn">Read more...</a>
              </div>
              <div id="time">Last updated: ${d}-${m + 1}-${y}</div>
          </div>`
            newsHtml += news;
        });
        accordionNews.innerHTML = newsHtml;
    }
    catch (e) {
        // `<h2>{error}</h2>`
        console.error();
    }
}
// setInterval function for date and time above the page.
setInterval(showClock, 1000);
function showClock() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let day = date.getDay();
    let todayDate = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let format;
    if (h > 12) {
        h -= 12;
        format = "PM";
    }
    else if (h == 0) {
        h = 12;
        format = "PM";
    }
    else {
        format = 'AM'
    }
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    // date formatting 
    todayDate = todayDate < 10 ? "0" + todayDate : todayDate;
    month = month < 10 ? "0" + month : month;
    // Displaying date;
    currentDate = `${todayDate}-${month + 1}-${year}`
    document.querySelector('#currentDate').innerHTML = currentDate;
    // Displaying time
    currentTime = `${h}:${m}:${s}&nbsp;${format}`
    let clock = document.querySelector('#currentTime');
    clock.innerHTML = currentTime;
}
showClock();
newsExpress();