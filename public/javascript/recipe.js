const listItems = document.querySelectorAll('.name');
const ratings = document.querySelectorAll('.review-rating');

window.onload = function(listAdjust) {
    let maxWidth = 0;
    listItems.forEach(element => {
        if(element.offsetWidth>maxWidth) {
            maxWidth=element.offsetWidth
        }
    })
    maxWidth+=10;
    listItems.forEach(item => {
        item.style.width = `${maxWidth}px`
    })
    if(ratings) {
        ratings.forEach(post => {
            console.log(parseInt(post.innerText)) 
            let rating='';
            for(let i=0; i < parseInt(post.innerText); i++) {
                rating+='&#11088';
            }
            post.innerHTML = `${rating}`
        })
    }
}